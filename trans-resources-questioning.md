---
layout: page
title: Trans Resources for Questioning People
image: 
page_id: '5'
meta_title: Trans Resources for Questioning People
meta_description: Resources for questioning people who don't know where they lie on the transgender spectrum.
---
{% capture index %}{% include pages/trans-resources-questioning.md %}{% endcapture %}
{{ index | markdownify }}

(Temporary, please excuse me while I update styles and content!)

<ul>
{% assign catResources = site.data.resources | where, "category", "questioning"  %}
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