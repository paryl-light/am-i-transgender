---
layout: home
title: Index
image: images/pages/d3_fpo_blue_640_480.jpg
page_id: '1'
meta_title: Welcome
meta_description: This is a great site
---
{% capture index %}{% include pages/index.md %}{% endcapture %}
{{ index | markdownify }}