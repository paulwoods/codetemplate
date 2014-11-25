package org.mrpaulwoods.codetemplate.group

import javax.persistence.*

import org.apache.commons.lang3.builder.ToStringBuilder
import org.apache.commons.lang3.builder.ToStringStyle
import org.mrpaulwoods.codetemplate.project.Project
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
	
	@ManyToMany
	@JoinTable(
		name="codetemplate_group_project",
		joinColumns=[@JoinColumn(name="group_id", referencedColumnName="id")],
		inverseJoinColumns=[@JoinColumn(name="project_id", referencedColumnName="id")])
	final List<Project> projects = new ArrayList<Project>()

	public String toString() {
		return ToStringBuilder.reflectionToString(this, ToStringStyle.SHORT_PREFIX_STYLE)
	}

}
