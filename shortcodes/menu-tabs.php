<?php
/**
 * Slider
 * Shortcode that allows to display a simple slideshow
 */

if ( !class_exists( 'avia_sc_submenu_tabs' ) ) 
{
	class avia_sc_submenu_tabs extends aviaShortcodeTemplate
	{
			static $count = 0;
	
			/**
			 * Create the config array for the shortcode button
			 */
			function shortcode_insert_button()
			{
				$this->config['name']			= __('Basecamp MenuTabs ', 'avia_framework' );
				$this->config['tab']			= __('Content Elements', 'avia_framework' );
				$this->config['icon']			= AviaBuilder::$path['imagesURL']."sc-submenu.png";
				$this->config['order']			= 29;
				$this->config['target']			= 'avia-target-insert';
				$this->config['shortcode'] 		= 'av_submenu';
				$this->config['tooltip'] 	    = __('Display a sub menu', 'avia_framework' );
				$this->config['tinyMCE'] 		= array('disable' => "true");
				$this->config['drag-level'] 	= 1;
			}

			/**
			 * Popup Elements
			 *
			 * If this function is defined in a child class the element automatically gets an edit button, that, when pressed
			 * opens a modal window that allows to edit the element properties
			 *
			 * @return void
			 */
			function popup_elements()
			{
				global $avia_config;
			
				$this->elements = array(

					array(
							"type" 	=> "tab_container", 'nodescription' => true
						),
						
					array(
							"type" 	=> "tab",
							"name"  => __("Content" , 'avia_framework'),
							'nodescription' => true
						),
			
					array(	
							"name" 	=> __("Select menu to display", 'avia_framework' ),
							"desc" 	=> __("You can create new menus in ", 'avia_framework' )."<a target='_blank' href='".admin_url('nav-menus.php?action=edit&menu=0')."'>".__('Appearance -> Menus', 'avia_framework' )."</a><br/>".__("Please note that Mega Menus are not supported for this element ", 'avia_framework' ),
							"id" 	=> "menu",
							"type" 	=> "select",
							"std" 	=> "",
							"subtype" =>  AviaHelper::list_menus()		
							),
					
                    array(	
						"name" 	=> __("Menu Position",'avia_framework' ),
						"name" 	=> __("Aligns the menu either to the left, the right or centers it",'avia_framework' ),
						"id" 	=> "position",
						"type" 	=> "select",
						"std" 	=> "center",
						"subtype" => array(   __('Left','avia_framework' )       =>'left',
						                      __('Center','avia_framework' )     =>'center',
						                      __('Right','avia_framework' )      =>'right', 
						                      )
				    ),
				    
				     array(
						"name" 	=> __("Menu Colors",'avia_framework' ),
						"id" 	=> "color",
						"desc"  => __("The menu will use the color scheme you select. Color schemes are defined on your styling page",'avia_framework' ) .
						           '<br/><a target="_blank" href="'.admin_url('admin.php?page=avia#goto_general_styling').'">'.__("(Show Styling Page)",'avia_framework' )."</a>",
						"type" 	=> "select",
						"std" 	=> "main_color",
						"subtype" =>  array_flip($avia_config['color_sets'])
				    ),
				    
				    array(	
						"name" 	=> __("Sticky Submenu", 'avia_framework' ),
						"desc" 	=> __("If checked the menu will stick at the top of the page once it touches it", 'avia_framework' ) ,
						"id" 	=> "sticky",
						"std" 	=> "true",
						"type" 	=> "checkbox"),
						
	              	 array(	
						"name" 	=> __("Mobile Menu Display",'avia_framework' ),
						"desc" 	=> __("How do you want to display the menu on mobile devices",'avia_framework' ),
						"id" 	=> "mobile",
						"type" 	=> "select",
						"std" 	=> "disabled",
						"subtype" => array(   __('Display full menu (works best if you only got a few menu items)','avia_framework' )       			=>'disabled',
						                      __('Display a button to open menu (works best for menus with a lot of menu items)','avia_framework' )     =>'active',
						                      )
				    ),
				    
				    array(	
						"name" 	=> __("Hide Mobile Menu Submenu Items", 'avia_framework'),
						"desc" 	=> __("By default all menu items of the mobile menu are visible. If you activate this option they will be hidden and a user needs to click on the parent menu item to display the submenus", 'avia_framework'),
						"id" 	=> "mobile_submenu",
						"required" 	=> array('mobile', 'equals', 'active'),
						"type" 	=> "checkbox",
						"std" 	=> ""
				    ),
						
				    array(
							"type" 	=> "close_div",
							'nodescription' => true
						),
					
					array(
							"type" 	=> "tab",
							"name"	=> __("Colors",'avia_framework' ),
							'nodescription' => true
						), 
				            
				    array(	
							"name" 	=> __("Menu Item Colors", 'avia_framework' ),
							"desc" 	=> __("Select an option for automatic colouring of the menu items", 'avia_framework' ),
							"id" 	=> "color_selection",
							"type" 	=> "select",
							"std" 	=> "",
							"subtype" => array( __("Default Color", 'avia_framework' )=>'default', __("Custom Color", 'avia_framework' )=>'custom-color-menu')
							), 
					
					array(	
							"name" 	=> __("Custom Start Color", 'avia_framework' ),
							"desc" 	=> __("Select a custom Start color for your Menu items here", 'avia_framework' ),
							"id" 	=> "color_start",
							"type" 	=> "colorpicker",
							"std" 	=> "",
							"required" => array('color_selection','equals','custom-color-menu')
						),
						
					array(	
							"name" 	=> __("Custom End Color", 'avia_framework' ),
							"desc" 	=> __("Select a custom End color for your Menu items here", 'avia_framework' ),
							"id" 	=> "color_end",
							"type" 	=> "colorpicker",
							"std" 	=> "",
							"required" => array('color_selection','equals','custom-color-menu')
						),

					array(
							"type" 	=> "close_div",
							'nodescription' => true
						),
						
					array(
						"type" 	=> "close_div",
						'nodescription' => true
					),	
					
				);

			}
			
			/**
			 * Editor Element - this function defines the visual appearance of an element on the AviaBuilder Canvas
			 * Most common usage is to define some markup in the $params['innerHtml'] which is then inserted into the drag and drop container
			 * Less often used: $params['data'] to add data attributes, $params['class'] to modify the className
			 *
			 *
			 * @param array $params this array holds the default values for $content and $args. 
			 * @return $params the return array usually holds an innerHtml key that holds item specific markup.
			 */
			function editor_element($params)
			{	
				$menus = get_terms( 'nav_menu', array( 'hide_empty' => false ) );
			
				$params['innerHtml'] = "<img src='".$this->config['icon']."' title='".$this->config['name']."' />";
				$params['innerHtml'].= "<div class='avia-element-label'>".$this->config['name']."</div>";
				return $params;
			}
			
			
			
			
			/**
			 * Frontend Shortcode Handler
			 *
			 * @param array $atts array of attributes
			 * @param string $content text within enclosing form of shortcode element 
			 * @param string $shortcodename the shortcode found, when == callback name
			 * @return string $output returns the modified html string 
			 */
			function shortcode_handler($atts, $content = "", $shortcodename = "", $meta = "")
			{
				$atts = shortcode_atts(array(
				'style'			=> '',
				'menu'			=> '',
				'position'	 	=> 'center',
				'sticky'		=> '',
				'color'			=> 'main_color',
				'color_selection'			=> 'default',
				'mobile'		=> 'disabled',
				'mobile_submenu'=> '',
				'color_start'=> '',
				'color_end'=> ''

				
				), $atts, $this->config['shortcode']);
				
				extract($atts);
				$output  	= "";
				$sticky_div = "";
				avia_sc_submenu_tabs::$count++;
				

				if($color_selection == 'default') {
					$color_start =  '#550053';
					$color_end =  '#dd22aa';
				}
				
				$params['class'] = "av-submenu-container {$color} ".$meta['el_class'];
				$params['open_structure'] = false; 
				$params['id'] = "sub_menu".avia_sc_submenu_tabs::$count;
				$params['custom_markup'] = $meta['custom_markup'];
				$params['style'] = "style='z-index:".(avia_sc_submenu_tabs::$count + 300)."'";
				
				if($sticky && $sticky != "disabled") 
				{
					$params['class'] .= " av-sticky-submenu";
					$params['before_new'] = "<div class='clear'></div>";
					$sticky_div = "<div class='sticky_placeholder'></div>";
				}
				
				//we dont need a closing structure if the element is the first one or if a previous fullwidth element was displayed before
				if(isset($meta['index']) && $meta['index'] == 0) $params['close'] = false;
				if(!empty($meta['siblings']['prev']['tag']) && in_array($meta['siblings']['prev']['tag'], AviaBuilder::$full_el_no_section )) $params['close'] = false;
				
				if(isset($meta['index']) && $meta['index'] != 0) $params['class'] .= " submenu-not-first";
				
				
				$element = wp_nav_menu(
					array(
	                	'menu' => wp_get_nav_menu_object( $menu ),
	                    'menu_class' =>"av-subnav-menu av-submenu-pos-{$position}",
	                    'fallback_cb' => '',
	                    'container'=>false,
	                    'echo' =>false,
	                    'walker' => new avia_responsive_mega_menu(array('megamenu'=>'disabled'))
	                )
				);
				
				$submenu_hidden = ""; 
				$mobile_button = $mobile == "active" ? "<a href='#' class='mobile_menu_toggle' ".av_icon_string('mobile_menu')."><span class='av-current-placeholder'>".__('Menu', 'avia_framework')."</span>" : "";
				if(!empty($mobile_button) && !empty($mobile_submenu) && $mobile_submenu != "disabled")
				{
					$submenu_hidden = "av-submenu-hidden";
				}
				
				// if(!ShortcodeHelper::is_top_level()) return $element;
				$output .=  avia_new_section($params);
				$output .= "<div class='container av-menu-mobile-{$mobile} {$submenu_hidden}' data-color_selection='{$color_selection}' data-color_start='{$color_start}' data-color_end='{$color_end}'>{$mobile_button}</a>".$element."</div>";
				$output .= avia_section_after_element_content( $meta , 'after_submenu', false, $sticky_div);
				return $output;

			}
			
	}
}



