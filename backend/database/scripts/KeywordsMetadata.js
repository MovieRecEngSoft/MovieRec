var assert = require('assert')

class KeywordsMetadata{

    constructor(){
        this.idToKeywordsIds = new Map()
        this.keywordMap = new Map()
    }

    setKeywordsIds(id, keywords){
        this.idToKeywordsIds.set(id, keywords)
    }

    containsKeyword(id){
        return this.keywordMap.get(id) !== undefined
    }

    addKeywords(keywords){
        for(let keyword of keywords){
            assert(!this.containsKeyword(keyword._id), "Keyword ja existente.")
            this.keywordMap.set(keyword._id, keyword)
        }
    }

    get keywords(){
        return Array.from(this.keywordMap.values())
    }

}

module.exports = KeywordsMetadata
