package org.mrpaulwoods.codetemplate.template

import groovy.text.SimpleTemplateEngine

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/templates")
class TemplateController {

	@Autowired
	TemplateRepository templateRepository
	
	@RequestMapping("/{id}/keys")
	public List<String> keys(@PathVariable Long id) {
		
		Template template = templateRepository.findOne(id);
		
		if(template) {
			template.keys()
		} else {
			[]
		}
	}	
	
	@RequestMapping("/{id}/build")
	BuildResponse build(@PathVariable Long id, @RequestBody Map<String,String> binding) {
		
		BuildResponse buildResponse = new BuildResponse()
		
		def template = templateRepository.findOne(id)
		if(template) {
			buildResponse.content = template.build binding
		}
		
		buildResponse
	}
	
}
