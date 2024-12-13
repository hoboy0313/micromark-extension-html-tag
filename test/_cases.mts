
export const inlineSingleTag = {
    name: 'inline-single-tag',
    input: '<div>123</div>',
    except: '<div>123</div>',
    options: {  
        whitelist: ['div']
    }
}

export const inlineSingleTagWithPrefixAndSuffix = {
    name: 'inline-single-tag-with-prefix-and-suffix',
    input: 'prefix<div>123</div>suffix',
    except: '<p>prefix<div>123</div>suffix</p>',
    options: {
        whitelist: ['div']
    }
}

export const inlineMultipleTags = {
    name: 'inline-multiple-tags',
    input: 'prefix<div>12<span>34</span>56<em>78</em>9</div>suffix',
    except: '<p>prefix<div>12&lt;span&gt;34&lt;/span&gt;56<em>78</em>9</div>suffix</p>',
    options: {
        whitelist: ['div', 'em']
    }
}

export const blockSingleTag = {
    name: 'block-single-tag',
    input: `
<div>
<strong>123</strong>
</div>`,
    except: `<div>
&lt;strong&gt;123&lt;/strong&gt;
</div>`,
    options: {
        whitelist: ['div']
    }
}

export const blockSingleTagWithPrefixAndSuffix = {
    name: 'block-single-tag-with-prefix-and-suffix',
    input: `
<div>
prefix<strong>123</strong>suffix
</div>`,
    except: `<div>
prefix&lt;strong&gt;123&lt;/strong&gt;suffix
</div>`,
    options: {
        whitelist: ['div']
    }
}
