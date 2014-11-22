package org.mrpaulwoods.codetemplate.template

import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.Id
import javax.persistence.Lob

import org.apache.commons.lang3.builder.ToStringBuilder
import org.apache.commons.lang3.builder.ToStringStyle

@Entity
class Template implements Serializable {

	@Id
	@GeneratedValue
	Long id
	
	@Column(length = 100)
	String name
	
	@Lob
	@Column
	String content
	
	public String toString() {
		return ToStringBuilder.reflectionToString(this, ToStringStyle.SHORT_PREFIX_STYLE);
	}

}
