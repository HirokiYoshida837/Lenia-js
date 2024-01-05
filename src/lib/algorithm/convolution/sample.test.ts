import {describe, expect, it} from "vitest";
import { greeter } from "./sample";

describe("はじめてのテスト", () => {

    it('名前が帰ってくる', ()=>{
        expect(greeter('世界')).toBe('hello 世界!')
    })

});

