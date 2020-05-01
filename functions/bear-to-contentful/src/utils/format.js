/**
 * Parses the input markdown and returns as an object.
 * @param {string} text the raw markdown to process
 */
const parse = text => {
    // Trim everything before first #
    const trimmedText = text.substring(/(.*?)#/s.exec(text)[1].length);

    // Parse categories
    const parsedCategories = /categories: (.*?)\n/.exec(trimmedText)[1];
    const categories = /,/.test(parsedCategories)
      ? parsedCategories.split(', ')
      : [parsedCategories];
    
    // Parse all other values
    return {
      title: /# (.*?)\n/.exec(trimmedText)[1],
      slug: /slug: (.*?)\n/.exec(trimmedText)[1],
      date: /date: (.*?)\n/.exec(trimmedText)[1],
      description: /description: (.*?)\n/.exec(trimmedText)[1],
      categories,
      body: trimmedText.substring(/#(.*)---/s.exec(trimmedText)[1].length + 4)
    };
}

/**
 * Formats a flat object into desired Contentful payload.
 * @param {string} text the raw markdown to process
 */
const format = text => {
  const { title, slug, date, description, categories, body } = parse(text);
  console.log(`\n
  Note details:
  ---
  title: ${title}
  slug: ${slug}
  date: ${date}
  description: ${description}
  categories: ${categories}
  body: ${body.substring(1, 60)}...
  ---
  `);
  return {
    'fields': {
      'title': { 'en-US': title },
      'slug': { 'en-US': slug },
      'date': { 'en-US': date },
      'shortDescription': { 'en-US': description },
      'category': { 'en-US': categories },
      'body': { 'en-US': body }
    }
  }
};

module.exports = {
  format
}
