package org.mrpaulwoods.codetemplate.template

import javax.persistence.*

import org.apache.commons.lang3.builder.ToStringBuilder
import org.apache.commons.lang3.builder.ToStringStyle
import org.mrpaulwoods.codetemplate.group.Group

@Entity
@Table(name="codetemplate_template")
class Template implements Serializable {

	@Id
	@GeneratedValue
	Long id
	
	@Column(length = 100)
	String name
	
	@Lob
	@Column
	String content
	
	@ManyToMany
	@JoinTable(
		name="codetemplate_template_group",
		joinColumns=[@JoinColumn(name="template_id", referencedColumnName="id")],
		inverseJoinColumns=[@JoinColumn(name="group_id", referencedColumnName="id")])
	final List<Group> groups = new ArrayList<Group>()
	
	public String toString() {
		return ToStringBuilder.reflectionToString(this, ToStringStyle.SHORT_PREFIX_STYLE);
	}

}
