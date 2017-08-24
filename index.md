---
layout: home
title: Index
image: 
page_id: '1'
meta_title: Welcome
meta_description: This is a great site
---
{% capture index %}{% include pages/index.md %}{% endcapture %}
{{ index | markdownify }}