This might be better named "recursive boolean operation for search" or something

Using the QueryEngine library, doing a full multi-word search on a collection.

Example:
    
    function doSearch(allSearches, index) {
      if (index < allSearches.length) {
        searchRegex = queryEngine.createSafeRegex(allSearches[index]);
        pass    = searchRegex.test(model.get('make_name'))
               || searchRegex.test(model.get('vin'))
               || searchRegex.test(model.get('trim'))
               || searchRegex.test(model.get('year'))
               || searchRegex.test(model.get('model_name'))
               || searchRegex.test(model.get('body_type_name'))
               || searchRegex.test(model.get('exterior_colour_name'))
               || searchRegex.test(model.get('stock_number'));
        return pass && doSearch(allSearches, index + 1);
      } else {
        return;
      }
    }
    return doSearch(searchItems, 0);