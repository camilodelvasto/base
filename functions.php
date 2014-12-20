<?php


// enqueue scripts
if(!is_admin()){
	add_action('wp_enqueue_scripts', 'base_register_frontend_scripts');
}

function base_register_frontend_scripts() {
	$template_url = get_template_directory_uri();
	$child_theme_url = get_stylesheet_directory_uri();

	//register js
	wp_enqueue_script( 'custom-js', $child_theme_url.'/js/custom.js', array('jquery'), 2, false ); //needs to be loaded at the top to prevent bugs
}


?>