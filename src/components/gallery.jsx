import React, { Component } from "react";
//import setting from "../setting.json"; // Importing consumer key from local file
import ImageComponent from "./imageComponent"; // Importing image component
import LightBox from "./lightBox"; // Importing simple lightBox component
import Pagination from "./pagination"; // Importing simple pagination component
import { withRouter } from "react-router";

/**
 * Control entire gallery component
 */
class Gallery extends Component {
	constructor(props) {
		super(props);
		this.state = { currentPage: 1, data: null, photo: null }; // initializing data and photo with null
	}

	/**
	 * Getting images from API and setting state data
	 * @param {number} pageNumber
	 */
	getImages = (pageNumber = 1) => {

		let search = window.location.search;
		let params = new URLSearchParams(search);
		let consumer_key = params.get("consumer_key");


		// 'popular' — Return photos in Popular. Default sort: rating.
		// 'highest_rated' — Return photos that have been in Popular. Default sort: highest_rating.
		// 'upcoming' — Return photos in Upcoming. Default sort: time when Upcoming was reached.
		// 'editors' — Return photos in Editors' Choice. Default sort: time when selected by an editor.
		// 'fresh_today' — Return photos in Fresh Today. Default sort: time when reached fresh.
		// 'fresh_yesterday' — Return photos in Fresh Yesterday. Default sort: same as 'fresh_today'.
		// 'fresh_week' — Return photos in Fresh This Week. Default sort: same as 'fresh_today'.

		let apiUrl = `https://api.500px.com/v1/photos?feature=upcoming&image_size[]=20&image_size[]=2048&page=${pageNumber}&consumer_key=${consumer_key}`;
		apiUrl = window.btoa( apiUrl );

		apiUrl = `https://tamilfire.com/gallery/proxy.php?url=${apiUrl}`;
		fetch(apiUrl)
			.then(response => response.json())
			.then(data => {
				this.setState({ data: data });
			})
			.catch(err => console.error(this.props.url, err.toString()));
	}

	componentDidMount() {
		let page = 1;

		if ( this.props.match.params.pageId ) {
			page = this.props.match.params.pageId;
			this.setState( {currentPage: page} );
		this.getImages( page );

		}
		// Initialize data from API after the component mount
		this.getImages( page );
	}

	componentDidUpdate( prevProps, prevState ) {
		if(prevProps === undefined) {
			return false
		}

		/**
		 * new Project in town ?
		 */
		if ( parseInt( this.props.match.params.pageId ) && parseInt( this.state.currentPage ) !== parseInt( this.props.match.params.pageId ) ) {
			this.getImages( parseInt( this.props.match.params.pageId ) );
			this.setState( {currentPage: this.props.match.params.pageId} );
		}
	}

	/**
	 * Handle photo click and set photo state
	 * responsible to track photo click
	 */
	handlePhotoChange = ( photo, event ) => {
		if ( event && event.target && event.target.classList.contains( 'nsfw' ) ) {
			event.target.classList.remove( 'nsfw' );
		} else {
			this.setState({ photo });
		}
	};

	/**
	 * Handle page changes from pagination components and
	 * load the images from API according to the page numbers
	 */
	handlePageChange = (pageNumber, currentPage = null) => {
		// Setting pageNumber for Next Button click
		if (currentPage && pageNumber === "Next") {
			pageNumber = currentPage + 1;
		}
		// Setting pageNumber for Previous Button click
		if (currentPage && pageNumber === "Previous") {
			pageNumber = currentPage - 1;
		}

		this.getImages(pageNumber);
	};

	render() {
		// object destructuring data
		const { data } = this.state;

		const pagination = <div className="row m1">
		<div align="center">
			{data && (
				<Pagination
					currentPage={parseInt( this.state.currentPage )}
					totalPages={data.total_pages}
					totalItems={data.total_items}
					onPageChange={this.handlePageChange}
				/>
			)}
		</div>
	</div>

		if (data && typeof data.error !== "undefined") {
			return <p>{data.error}</p>;
		}
		return (
			<div className="container">
				<div className="row">
					<h1>Gallery</h1>
				</div>
				{ pagination }
				<LightBox
					onPhotoClick={this.handlePhotoChange}
					photo={this.state.photo}
				/>
				<div className="image-container row">
					{data &&
						data.photos.map((photo, index) => {
							// loading images from data
							return (
								<ImageComponent
									key={index}
									photo={photo}
									onPhotoClick={this.handlePhotoChange}
								/>
							);
						})}
				</div>
				{ pagination }

			</div>
		);
	}
}

export default withRouter( Gallery );
