/**
 * Splits a paragraph into sentences while handling common edge cases.
 * @param {string} paragraph - The input text to be split into sentences
 * @returns {string[]} An array of sentences
 */
export function splitIntoSentences(paragraph) {
  if (!paragraph || typeof paragraph !== 'string') {
    return []
  }

  // Handle common abbreviations to prevent false splits
  const preserveAbbreviations = paragraph
    .replace(/Mr\./g, 'Mr\u200B')
    .replace(/Mrs\./g, 'Mrs\u200B')
    .replace(/Ms\./g, 'Ms\u200B')
    .replace(/Dr\./g, 'Dr\u200B')
    .replace(/Sr\./g, 'Sr\u200B')
    .replace(/Jr\./g, 'Jr\u200B')
    .replace(/Prof\./g, 'Prof\u200B')
    .replace(/Ph\.D\./g, 'PhD\u200B')
    .replace(/i\.e\./g, 'ie\u200B')
    .replace(/e\.g\./g, 'eg\u200B')
    .replace(/etc\./g, 'etc\u200B')
    .replace(/vs\./g, 'vs\u200B')
    .replace(/\d+\./g, (match) => match.replace('.', '\u200B'))

  // Split on sentence-ending punctuation followed by whitespace and capital letter
  const sentences = preserveAbbreviations
    .split(/([.!?]+[\s\n]+)(?=[A-Z])/)
    .reduce((acc, current, index, array) => {
      // Combine sentence endings with their content
      if (index % 2 === 0) {
        const sentenceEnd = array[index + 1] || ''
        acc.push((current + sentenceEnd).trim())
      }
      return acc
    }, [])
    .filter((sentence) => sentence.length > 0)
    // Restore original periods in abbreviations
    .map((sentence) => sentence.replace(/\u200B/g, '.'))

  return sentences
}
