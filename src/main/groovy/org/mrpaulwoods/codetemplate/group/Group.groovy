package org.mrpaulwoods.codetemplate.group

import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.Id
import javax.persistence.ManyToMany
import javax.persistence.Table

import org.apache.commons.lang3.builder.ToStringBuilder
import org.apache.commons.lang3.builder.ToStringStyle
import org.mrpaulwoods.codetemplate.template.Template

@Entity
@Table(name="codetemplate_group")
class Group implements Serializable {

	@Id
	@GeneratedValue
	Long id
	
	String name
	
	@ManyToMany(mappedBy="groups")
	final List<Template> templates = new ArrayList<Template>()
	
	public String toString() {
		return ToStringBuilder.reflectionToString(this, ToStringStyle.SHORT_PREFIX_STYLE);
	}

}
