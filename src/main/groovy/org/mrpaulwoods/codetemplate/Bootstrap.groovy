package org.mrpaulwoods.codetemplate

import groovy.util.logging.Slf4j

import javax.annotation.PostConstruct

import org.mrpaulwoods.codetemplate.group.Group
import org.mrpaulwoods.codetemplate.group.GroupRepository
import org.mrpaulwoods.codetemplate.template.Template
import org.mrpaulwoods.codetemplate.template.TemplateRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Component

@Slf4j
@Component
class Bootstrap {

	@Autowired
	TemplateRepository templateRepository

	@Autowired
	GroupRepository groupRepository
	
	@PostConstruct
	public void init() {

		log.info "### bootstrap ###"

		if(0 == templateRepository.count()) {
			
			Template templateDomain = new Template(name:"java domain", content:contentDomain)
			Template templateDomainSpecification = new Template(name:"java domain specification", content:contentDomainSpecification)
			Template templateService = new Template(name:"java service", content:contentService)
			Template templateServiceSpecification = new Template(name:"java service specification", content:contentServiceSpecification)
			Template templateController = new Template(name:"java controller", content:contentController)
			Template templateControllerSpecification = new Template(name:"java controller specification", content:contentControllerSpecification)
			Template templateDao = new Template(name:"java mybatis dao", content:contentDao)
			Template templateDaoXml = new Template(name:"java mybatis dao xml", content:contentDaoXml)
	
			templateDomain = templateRepository.save(templateDomain)
			templateDomainSpecification = templateRepository.save(templateDomainSpecification)
			templateService = templateRepository.save(templateService)
			templateServiceSpecification = templateRepository.save(templateServiceSpecification)
			templateController = templateRepository.save(templateController)
			templateControllerSpecification = templateRepository.save(templateControllerSpecification)
			templateDao = templateRepository.save(templateDao)
			templateDaoXml = templateRepository.save(templateDaoXml)
			
			Group groupTiSpring = new Group(name:"ti spring")
			groupTiSpring = groupRepository.save(groupTiSpring)
			
			groupTiSpring.templates.add templateDomain
//			groupTiSpring.templates.add templateDomainSpecification
			groupTiSpring.templates.add templateService
//			groupTiSpring.templates.add templateServiceSpecification
			groupTiSpring.templates.add templateController
//			groupTiSpring.templates.add templateControllerSpecification
			groupTiSpring.templates.add templateDao
			groupTiSpring.templates.add templateDaoXml
			
			templateDomain.groups.add groupTiSpring
//			templateDomainSpecification.groups.add groupTiSpring
			templateService.groups.add groupTiSpring
//			templateServiceSpecification.groups.add groupTiSpring
			templateController.groups.add groupTiSpring
//			templateControllerSpecification.groups.add groupTiSpring
			templateDao.groups.add groupTiSpring
			templateDaoXml.groups.add groupTiSpring
			
			groupRepository.save groupTiSpring
			
			templateRepository.save templateDomain
			templateRepository.save templateDomainSpecification
			templateRepository.save templateService
			templateRepository.save templateServiceSpecification
			templateRepository.save templateController
			templateRepository.save templateControllerSpecification
			templateRepository.save templateDao
			templateRepository.save templateDaoXml
			
		}
		
		
	}

	///////////////////////////////////////////////////////////////////////////////////////////////////

	String contentDomain = '''package ${pkg};

import java.io.Serializable;
import org.apache.commons.lang3.builder.EqualsBuilder;
import org.apache.commons.lang3.builder.HashCodeBuilder;
import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;

public class ${domainName} implements Serializable {

	private static final long serialVersionUID = 1L;

	private Long id;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public int hashCode() {
		return new HashCodeBuilder(17, 31).append(id).toHashCode();
	}

	public boolean equals(Object obj) {
		if(null == obj) {
			return false;
		}
	
		if(obj == this) {
			return true;
		}
	
		if(!(obj instanceof ${domainName})) {
			return false;
		}
	
		${domainName} rhs = (${domainName}) obj;
	
		return new EqualsBuilder().append(id, rhs.id).isEquals();
	}

	public String toString() {
		return ToStringBuilder.reflectionToString(this, ToStringStyle.SHORT_PREFIX_STYLE);
	}

}
	'''

	///////////////////////////////////////////////////////////////////////////////////////////////////

	String contentService = '''package ${pkg};

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ${exceptionPackage}.${exceptionClassName};

@Service
@Transactional
public class ${domainName}Service {

	@Autowired
	${domainName}Dao ${instanceName}Dao;
	
	public void create(${domainName} ${instanceName}) {
		${instanceName}Dao.create(${instanceName});
	}

	public ${domainName} read(Long id) {
		return ${instanceName}Dao.read(id);
	}

	public ${domainName} fetch(Long id) {
		${domainName} ${instanceName} = read(id);
		if(null == ${instanceName}) {
			throw new ${exceptionClassName}("${instanceName} not found", HttpStatus.NOT_FOUND);
		}
		return ${instanceName};
	}

	public void update(${domainName} ${instanceName}) {
		${instanceName}Dao.update(${instanceName});
	}

	public void delete(Long id) {
		${instanceName}Dao.delete(id);
	}

	public List<${domainName}> list() {
		return ${instanceName}Dao.list();
	}
	
}
	'''

	///////////////////////////////////////////////////////////////////////////////////////////////////

	String contentController = '''package ${pkg};

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/${instanceNamePlural}")
public class ${domainName}Controller {

	@Autowired
	${domainName}Service ${instanceName}Service;
 
	@ResponseBody
	@RequestMapping(value="", method=RequestMethod.POST)
	public ResponseEntity<${domainName}> create(@RequestBody ${domainName} ${instanceName}) {
		${instanceName}Service.create(${instanceName});
		return new ResponseEntity<${domainName}>(${instanceName}, HttpStatus.CREATED);
	}

	@ResponseBody
	@RequestMapping(value="/{id}", method=RequestMethod.GET)
	public ResponseEntity<${domainName}> read(@PathVariable Long id) {
		${domainName} ${instanceName} = ${instanceName}Service.read(id);
		return new ResponseEntity<${domainName}>(${instanceName}, HttpStatus.OK);
	}

	@ResponseBody
	@RequestMapping(value="/{id}", method=RequestMethod.PUT)
	public ResponseEntity<${domainName}> update(@PathVariable Long id, @RequestBody ${domainName} ${instanceName}) {
		${instanceName}Service.update(${instanceName});
		return new ResponseEntity<${domainName}>(${instanceName}, HttpStatus.OK);
	}

	@ResponseBody
	@RequestMapping(value="/{id}", method=RequestMethod.DELETE)
	public ResponseEntity<${domainName}> delete(@PathVariable Long id) {
		${instanceName}Service.delete(id);
		return new ResponseEntity<${domainName}>(HttpStatus.NO_CONTENT);
	}

	@ResponseBody
	@RequestMapping(value="", method=RequestMethod.GET)
	public ResponseEntity<List<${domainName}>> list() {
		List<${domainName}> ${instanceNamePlural} = ${instanceName}Service.list();
		return new ResponseEntity<List<${domainName}>>(${instanceNamePlural}, HttpStatus.OK);
	}

}
	'''

	///////////////////////////////////////////////////////////////////////////////////////////////////

	String contentDao = '''package ${pkg};

import java.util.List;
import org.apache.ibatis.annotations.Param;
import com.ti.spring.annotations.MyBatisRepository;

@MyBatisRepository
public interface ${domainName}Dao {

	void create(${domainName} ${instanceName});

	${domainName} read(@Param("id") Long id);

	void update(${domainName} ${instanceName});

	void delete(@Param("id") Long id);

	List<${domainName}> list();
}
	'''

	///////////////////////////////////////////////////////////////////////////////////////////////////

	String contentDaoXml = '''<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" "http://mybatis.org/dtd/mybatis-3-mapper.dtd">

<mapper namespace="${pkg}.${domainName}Dao">

	<insert id="create" parameterType="${pkg}.${domainName}" useGeneratedKeys="true" keyProperty="id" keyColumn="id">
		insert into ${tableNamePrefix}${instanceName}
		(...)
		values
		(#{...})
	</insert>

	<select id="read" parameterType="long" resultType="${pkg}.${domainName}">
		select
			id as "id"
		from ${tableNamePrefix}${instanceName}
		where id = #{id}
	</select>

	<update id="update" parameterType="${pkg}.${domainName}">
		update ${tableNamePrefix}${instanceName}
		set ...
		where id = #{id}
	</update>

	<delete id="delete" parameterType="long">
		delete
		from ${tableNamePrefix}${instanceName}
		where id = #{id}
	</delete>
	
	<select id="list" resultType="${pkg}.${domainName}">
		select
			id as "id"
		from ${tableNamePrefix}${instanceName}
		order by id
	</select>
	
</mapper>
	'''

	///////////////////////////////////////////////////////////////////////////////////////////////////

	String contentDomainSpecification = '''package ${pkg};

import spock.lang.Specification;

public class ${domainName}Spec extends Specification {

	${domainName} ${instanceName}
	
	def setup() {
		${instanceName} = new ${domainName}()
	}
	
	void "id can be set"() {
		expect:
		null == ${instanceName}.id
		
		when:
		${instanceName}.id = 111
		
		then:
		111 == ${instanceName}.id
	}
	
	void "test hashCode"() {
		when:
		${instanceName}.id = 10
		
		then:
		537 == ${instanceName}.hashCode()
	}
	
	void "test equals"() {
		given:
		${instanceName}.id = 1
		${domainName} ${instanceName}1 = new ${domainName}(id:1)
		${domainName} ${instanceName}2 = new ${domainName}(id:2)
		
		expect:
		false == ${instanceName}.equals(null)
		true == ${instanceName}.equals(${instanceName})
		false == ${instanceName}.equals("string")
		true == ${instanceName}.equals(${instanceName}1)
		false == ${instanceName}.equals(${instanceName}2)
	}

	void "test toString"() {
		when:
		${instanceName}.toString()
		
		then:
		notThrown Exception
	}
	
}
	'''

	///////////////////////////////////////////////////////////////////////////////////////////////////

	String contentServiceSpecification = '''package ${pkg};

import org.springframework.http.HttpStatus;
import spock.lang.Specification
import ${exceptionPackage}.${exceptionClassName}

public class ${domainName}ServiceSpec extends Specification {
	
	${domainName}Service service
	${domainName}Dao ${instanceName}Dao = Mock()
	${domainName} ${instanceName}
	${domainName} ${instanceName}1 = new ${domainName}(id:100)
	
	def setup() {
		service = new ${domainName}Service()
		service.${instanceName}Dao = ${instanceName}Dao
		${instanceName} = new ${domainName}()
	}
	
	def "create deletages to dao"() {
		when:
		service.create(${instanceName})
		
		then:
		1 * ${instanceName}Dao.create(${instanceName})
	}
	
	def "read deletages to dao"() {
		when:
		def result = service.read(1)
		
		then:
		${instanceName} == result
		1 * ${instanceName}Dao.read(1) >> ${instanceName}
	}
	
	def "update deletages to dao"() {
		when:
		service.update(${instanceName})
		
		then:
		1 * ${instanceName}Dao.update(${instanceName})
	}
	
	def "delete deletages to dao"() {
		when:
		service.delete(${instanceName}.id)
		
		then:
		1 * ${instanceName}Dao.delete(${instanceName}.id)
	}
	
	def "fetch throws if ${instanceName} not found"() {
		when:
		service.fetch(0);
		
		then:
		${exceptionClassName} e = thrown()
		"${instanceName} not found" == e.message
		
		1 * ${instanceName}Dao.read(0) >> null
	}
	
	def "fetch returns the ${instanceName}"() {
		when:
		def result = service.fetch(${instanceName}.id);
		
		then:
		${instanceName} == result
		
		1 * ${instanceName}Dao.read(${instanceName}.id) >> ${instanceName}
	}
	
	def "list deletages to dao"() {
		when:
		def result = service.list()
		
		then:
		[${instanceName}] == result
		1 * ${instanceName}Dao.list() >> Arrays.asList(${instanceName})
	}
	
}
	'''

	///////////////////////////////////////////////////////////////////////////////////////////////////

	String contentControllerSpecification = '''package ${pkg};

import spock.lang.Specification;

public class ${domainName}ControllerSpec extends Specification {
	
	${domainName}Controller controller
	${domainName}Service ${instanceName}Service = Mock()
	${domainName} ${instanceName}1
	
	def setup() {
		controller = new ${domainName}Controller()
		controller.${instanceName}Service = ${instanceName}Service
		${instanceName}1 = new ${domainName}()
	}
	
	void "create delegates to service"() {
		when:
		def result = controller.create(${instanceName}1)
		
		then:
		${instanceName}1 == result.body
		1 * ${instanceName}Service.create(${instanceName}1)
	}
	
	void "read delegates to service"() {
		when:
		def result = controller.read(${instanceName}1.id)
		
		then:
		${instanceName}1 == result.body
		1 * ${instanceName}Service.read(${instanceName}1.id) >> ${instanceName}1
	}
	
	void "update delegates to service"() {
		when:
		def result = controller.update(${instanceName}1.id, ${instanceName}1)
		
		then:
		${instanceName}1 == result.body
		1 * ${instanceName}Service.update(${instanceName}1)
	}
	
	void "delete delegates to service"() {
		when:
		def result = controller.delete(${instanceName}1.id)
		
		then:
		null == result.body
		1 * ${instanceName}Service.delete(${instanceName}1.id)
	}
	
	void "list delegates to service"() {
		when:
		def result = controller.list()
		
		then:
		[${instanceName}1] == result.body
		1 * ${instanceName}Service.list() >> [${instanceName}1]
	}
	
}
	'''

}
