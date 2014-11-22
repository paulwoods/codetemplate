package org.mrpaulwoods.codetemplate.template

import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.Id

@Entity
class Template implements Serializable {

	@Id
	@GeneratedValue
	Long id
	
	@Column(length = 100)
	String name
	
	@Column(length = 4000)
	String content
	
}
