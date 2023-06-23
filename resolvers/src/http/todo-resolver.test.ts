// @ts-nocheck
// TODO do we want strict TS checking ? Find out if we can mock parts of Context
import {request} from "./todo-resolver";
import {Context} from "@aws-appsync/utils";

test('returns get with right ID', () => {
    const context: Context = {
        arguments: { id: 1 },
        identity: null,
        args: null,
        source: null,
        info: null,
        stash: null,
        result: null,
        prev: null,
        request: null
    }
    const result = request(context)
    expect(result).toEqual({
        method: 'GET',
        resourcePath: `/todos/1`,
    });
});
