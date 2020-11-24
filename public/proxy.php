<?php
/**
 * proxy for getting json data via CURL
 */

header( 'Cache-Control: no-cache, must-revalidate' );
header( 'Expires: Mon, 26 Jul 1997 05:00:00 GMT' );
header( 'Content-type: application/json' );
header( 'Access-Control-Allow-Origin: *' );

if ( ! isset( $_REQUEST['url'] ) ) {
    $response = json_encode( array( 'error' => 'add url parameters' ) );
    die( $response );
}

$url = base64_decode( $_REQUEST['url'] );
$response = json_encode( array( 'error' => 'not a valid url ' . $url ) );

$url = filter_var( $url, FILTER_VALIDATE_URL );

if ( $url ) {
	$response = file_get_contents( $url );
}
echo $response;

die();
