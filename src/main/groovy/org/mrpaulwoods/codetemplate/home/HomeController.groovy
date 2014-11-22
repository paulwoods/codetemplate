package org.mrpaulwoods.codetemplate.home

import groovy.util.logging.Slf4j

import org.springframework.stereotype.Controller
import org.springframework.ui.Model
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestMethod
import org.springframework.web.servlet.support.ServletUriComponentsBuilder

@Slf4j
@Controller
@RequestMapping("/")
class HomeController {

	@RequestMapping(value="", method=RequestMethod.GET)
	public String index(Model model) {
		String url = ServletUriComponentsBuilder.fromCurrentContextPath().path("/api").build().toString()
		model.addAttribute("api", url);
		"index"
	}
	
}
