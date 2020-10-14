import React, { Component } from "react";
import { Link, withRouter } from 'react-router-dom';


class Pagination extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	/**
	 * create custom page range
	 * @param {Number} from
	 * @param {Number} to
	 *
	 * @returns {Array} rangeList
	 */
	pageRange(from, to) {
		if (from <= 0) {
			from = 1;
		}
		let rangeList = [];

		while (from <= to) {
			rangeList.push(from);
			from++;
		}

		return rangeList;
	}

	/**
	 * Fetching page numbers to array and return
	 * @param {number} currentPage
	 * @param {number} totalItems
	 * @param {number} pageLimit
	 *
	 * @returns {Array} pages
	 */
	fetchPages(currentPage, totalItems, pageLimit = 30) {
		let numOfPageItems = 10;
		let pages = [];
		let totalPages = Math.ceil(totalItems / pageLimit);

		// Set previous page when current page is not 1st page
		if (currentPage > 1) {
			pages = ["Previous"];
		}

		// Print the page number for 1st 10 pages untill current page reaches in the middle
		if (currentPage <= (numOfPageItems - 4) && (numOfPageItems <= totalPages)) {
			let end = totalPages > numOfPageItems ? numOfPageItems : totalPages;
			pages = [...pages, ...this.pageRange(1, end)];
		}

		// print the pages numbers and keep the active page in the middle
		if (currentPage > numOfPageItems - 4) {
			let start = currentPage - 4;
			let end = currentPage + 5;
			if (totalPages - numOfPageItems < currentPage) {
				start = totalPages - numOfPageItems;
				end = totalPages;
			}

			pages = [...pages, ...this.pageRange(start, end)];
		}

		// Print the next button for pages other than last active page
		if (currentPage < totalPages) {
			pages = [...pages, "Next"];
		}

		return pages;
	}

	getHtmlLink = ( key, page, currentPage ) => {
		return (
			<li
				onClick={e => this.props.onPageChange(page, currentPage, e)}
				className={` page-item ${
					page === currentPage ? "active disabled" : ""
				}`}
				key={key}
			>
				<span className="page-link">{page}</span>
			</li>
		);
	}

	getLinkFormat = ( key, page, pageString, queryString, linkClassAttr = '' ) => {
		return <li key={key} className={`page-item ${linkClassAttr}`}>
					<Link key={key} className="page-link" to={`/page/${page}${queryString}`}>{pageString}</Link>
				</li>
	}

	render() {
		// destructuring props
		const { currentPage, totalItems } = this.props;
		const pages = this.fetchPages(currentPage, totalItems);
		return (
			<React.Fragment>
				<nav aria-label="Page navigation">
					<ul className="pagination">
						{pages.map((page, key) => {
							let linkClassAttr = '';
							let pageString = page;
							if ( page === parseInt( this.props.match.params.pageId ) ) {
								linkClassAttr = 'active disabled';
							}

							if ( pageString === 'Next' ) {
								page = (parseInt( this.props.match.params.pageId ) + 1)
							}
							if ( pageString === 'Previous' ) {
								page = (parseInt( this.props.match.params.pageId ) - 1)
							}
							// return this.getHtmlLink( key, page, pageString, this.props.location.search, linkClassAttr );
							return this.getLinkFormat( key, page, pageString, this.props.location.search, linkClassAttr );
						})}
					</ul>
				</nav>
			</React.Fragment>
		);
	}
}

export default withRouter( Pagination );
