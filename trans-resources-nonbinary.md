---
layout: page
title: Resources for Nonbinary Transgender People
image: 
page_id: '4'
meta_title: Nonbinary Transgender People Resources
meta_description: A place with resources for nonbinary transgender people.
---
{% capture index %}{% include pages/trans-resources-nonbinary.md %}{% endcapture %}
{{ index | markdownify }}

(Temporary, please excuse me while I update styles and content!)

<ul>
{% assign catResources = site.data.resources | where, "category", "nonbinary"  %}
{% for resource in catResources %}
    <li>
        <a href="{{resource.url}}" title="{{resource.description}}" style="color: {{resource.color}};">{{resource.name}}</a>
    </li>
{% endfor %}
{% assign catResources = site.data.resources | where, "category", "general"  %}
{% for resource in catResources %}
    <li>
        <a href="{{resource.url}}" title="{{resource.description}}" style="color: {{resource.color}};">{{resource.name}}</a>
    </li>
{% endfor %}
</ul>