package org.mrpaulwoods.codetemplate

import groovy.util.logging.Slf4j

import javax.annotation.PostConstruct

import org.mrpaulwoods.codetemplate.template.Template
import org.mrpaulwoods.codetemplate.template.TemplateRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Component

@Slf4j
@Component
class Bootstrap {

	@Autowired 
	TemplateRepository templateRepository
	
	@PostConstruct
	public void init() {
		
		log.info "### bootstrap ###"
		
		templateRepository.save new Template(name:"alpha", content:"aaaaaaa")
		templateRepository.save new Template(name:"bravo", content:"bbbbbbb")
		templateRepository.save new Template(name:"charlie", content:"ccccccc")
	}
}
