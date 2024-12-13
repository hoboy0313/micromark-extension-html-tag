import { expect, test } from 'vitest';
import {micromark} from 'micromark';
import {htmlTag} from '../src/index.mts';
import * as cases from './_cases.mts';

Object.entries(cases).forEach(([_, value]) => {
    test(value.name, () => {
        const result = micromark(value.input, {
            htmlExtensions: [htmlTag(value.options)]
        });

        expect(result).toBe(value.except);
    });
});
