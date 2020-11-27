import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Gallery from "./components/gallery";
import * as serviceWorker from "./serviceWorker";
import "bootstrap/dist/css/bootstrap.css";
import { Switch, Route, BrowserRouter } from 'react-router-dom';

// Adding gallery component to root div
ReactDOM.render(
	<BrowserRouter basename={'gallery'}>
		<Switch>
			<Route path="/page/:pageId" component={Gallery}/>
			<Route path="/" component={Gallery}/>
		</Switch>
	</BrowserRouter>,
	document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
