
#!/usr/bin/env python
# -*- coding: utf-8 -*-

import helper
import re

# pattern = re.compile(r'\d+')

def fetchGoods(url):
	pq = helper.get(url)
	# 评分
	span = pq('.RatingBadge-sm')
	score = span.text()
	# 评论数
	a = pq('.RatingBadge__read-more')
	comment = a.text().split(' ')[0].replace('(', '')
	# 成分
	optionList = pq('.Ingredients__selector>option')
	# https://www.bodybuilding.com/store/common/ajax/catalog/ingredient-xhr.jsp?skuId=22DAY2280006
	# https://www.bodybuilding.com/store/common/ajax/catalog/ingredient-xhr.jsp?skuId&#x3D;22DAY2280004
	for option in optionList:
		pq = helper.get(option.get('value'))
		html = pq('td')

		break

def fetchSection(url):
	pq = helper.get(url)
	aList = pq('.product__rating-n-view-product>a')
	for a in aList:
		fetchGoods(a.get('href'))
		break

if __name__ == '__main__':
	url = 'https://www.bodybuilding.com/store/listing.htm'
	pq = helper.get(url)
	aList = pq('a.index__section-link')
	for a in aList:
		fetchSection(a.get('href'))
		break