import type {HtmlExtension, CompileContext} from 'micromark-util-types';

interface HtmlTagExtensionOptions {
    whitelist?: string[];
}

type HtmlTagExtension = (options?: HtmlTagExtensionOptions) => HtmlExtension;

const htmlTag: HtmlTagExtension = (options = {}) => {
    const whitelist = options.whitelist ?? [];
    const tagPattern = /<\/?(\w+)([^>]*)>/g;

    function processHtmlWithWhitelist(this: CompileContext, content: string, allowedTags: string[]) {
        let lastIndex = 0;
        let result = '';
        let match: RegExpExecArray | null = null;

        while ((match = tagPattern.exec(content)) !== null) {
            const fullTag = match[0];
            const tagName = match[1];
            const tagIndex = match.index;

            // 添加标签前的文本
            result += content.slice(lastIndex, tagIndex);

            // 处理标签
            if (!allowedTags.includes(tagName)) {
                result += this.encode(fullTag);
            } else {
                result += fullTag;
            }

            // 更新 lastIndex
            lastIndex = tagIndex + fullTag.length;
        }

        // 添加剩余的文本
        result += content.slice(lastIndex);

        return result;
    }

    return {
        enter: {
            htmlFlow(token) {
                const content = this.sliceSerialize(token);

                if (whitelist.length === 0 || !content) {
                    this.raw(content);
                    return;
                }

                const result = processHtmlWithWhitelist.call(this, content, whitelist);
                this.raw(result);
                this.buffer();
            },

            htmlText(token) {
                if (whitelist.length === 0) {
                    return;
                }

                const content = this.sliceSerialize(token);

                const match = content.match(/<\/?(\w+)([^>]*)>/) ?? [];
                const fullTag = match[0] || '';
                const tagName = match[1];
                
                if (whitelist.includes(tagName)) {
                    this.setData('ignoreEncode', true);
                    this.raw(fullTag);
                    this.setData('ignoreEncode');
                } else {
                    this.raw(this.encode(fullTag));
                }

                this.buffer();
            },
        },

        exit: {
            htmlFlow() {
                this.resume();
            },

            htmlText() {
                this.resume();
            }
        },
    } satisfies HtmlExtension;
};

export {
    htmlTag,
};

export type {
    HtmlTagExtensionOptions
}
