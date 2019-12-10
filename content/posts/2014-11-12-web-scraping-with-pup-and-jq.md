---
date: "2014-11-12T11:10:39Z"
title: Web Scraping with pup and jq
---

I'm sure you've heard of [jq] by now, it's the best way to deal with JSON data on the command line. I previously wrote about a nifty way to [use jq to import JSON into Elasticsearch](/2014/10/23/using-jq-to-import-json-into-elasticsearch.html). It's great for filtering, transforming, and otherwise munging JSON data but 70% of the time I use it just to pretty print and syntax highlight JSON on the command line. Next time you have a big pile of JSON, try piping it to `jq '.'`.

[pup] is the spiritual cousin of jq, except for HTML. It has become my go-to tool for munging (and yes, even just viewing: pipe some HTML to `pup -c`) HTML on the command line.

I recently used the two together to scrape a local legal news site. 

> **Disclaimer:** Be nice when you do this! And know that even if you're nice most "webmasters" wouldn't like you to do this. In this case it's public data (sort-of...)

I wanted to setup an automated alert when real estate was transferred on my street. Most people just read the "newspaper" every day to do this but I have better things to do with my time (like write scripts to... er...)

There are three steps to this, let's look at each in turn and how they connect together:

### Getting the HTML (curl)

```bash
curl "https://www.legalnewsexample.com/realestate/index" > out.html
```

### Extracting the HTML (pup)

In my case, the data we are interested in is in a table with the rows of interest starting with "id". We can use one of the many [CSS3 selector](https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Getting_started/Selectors) supports to extract just those elements:

```bash
cat out.html | pup 'tr[id^="id"] json{}' > out.json
```

We're actually not asking much from pup in this case, just using its ability to subset some HTML and convert it to a JSON structure for our next step.

### Converting to JSON (jq)

```bash
cat out.json | jq '.[] | {"id": .children[0].children[0].href, "soldDate": .children[1].text, "seller": .children[2].text, "buyer": .children[3].text, "parcel": .children[4].text, "address": .children[5].children[0].children[0].text, "cityStateZip": .children[5].children[0].children[1].text, "county": .children[6].text, "saleAmount": .children[7].text|gsub("[\\$\\,]"; "")|tonumber}'
```

jq does the bulk of the work here. I looked at the JSON generated from pup and sussed out the structure. It's a bit hard to read as one line, let's look at it formatted: 

```js
{
  "id":           .children[0].children[0].href,
  "soldDate":     .children[1].text,
  "seller":       .children[2].text,
  "buyer":        .children[3].text,
  "parcel":       .children[4].text,
  "address":      .children[5].children[0].children[0].text,
  "cityStateZip": .children[5].children[0].children[1].text,
  "county":       .children[6].text,
  "saleAmount":   .children[7].text | gsub("[\\$\\,]"; "") | tonumber
}
```

Most of the data we need is in the text of the elements, but in the case of the id, we're actually using the href attribute of a link.

The `saleAmount` field uses some [jq functions](http://stedolan.github.io/jq/manual/#Builtinoperatorsandfunctions) to transform a string like `"$100,000.00"` into a number like `100000` by stripping out the `$` and `,` with a regular expression (`gsub`) and converting that string to a number (`tonumber`).

Truth be told this is a process of trial and error. I had 13 separate iterations of this in my bash history as I built up this long command string.

### All Together Now

Once we have the steps in place, we can replace those redirections and cats to files with pipes:

```bash
curl "https://www.legalnewsexample.com/realestate/index" | pup 'tr[id^="id"] json{}' | jq '.[] | {"id": .children[0].children[0].href, "soldDate": .children[1].text, "seller": .children[2].text, "buyer": .children[3].text, "parcel": .children[4].text, "address": .children[5].children[0].children[0].text, "cityStateZip": .children[5].children[0].children[1].text, "county": .children[6].text, "saleAmount": .children[7].text|gsub("[\\$\\,]"; "")|tonumber}'
```

3 small utilities each doing what they do well, connected together via pipes to solve a problem. Unix!

[jq]: http://stedolan.github.io/jq/
[pup]: https://github.com/EricChiang/pup
