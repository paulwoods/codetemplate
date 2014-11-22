package org.mrpaulwoods.codetemplate.template

import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.Id

@Entity
class Template implements Serializable {

	@Id
	@GeneratedValue
	Long id
	
	String name
	
	String content
	
}
