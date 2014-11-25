package org.mrpaulwoods.codetemplate.project

import javax.persistence.*

import org.apache.commons.lang3.builder.ToStringBuilder
import org.apache.commons.lang3.builder.ToStringStyle
import org.mrpaulwoods.codetemplate.group.Group

@Entity
@Table(name="codetemplate_project")
class Project implements Serializable {

	@Id
	@GeneratedValue
	Long id
	
	String name
	
	String folder
	
	@ManyToMany(mappedBy="projects")
	final List<Group> groups = new ArrayList<Group>()
	
	public String toString() {
		return ToStringBuilder.reflectionToString(this, ToStringStyle.SHORT_PREFIX_STYLE)
	}

}
