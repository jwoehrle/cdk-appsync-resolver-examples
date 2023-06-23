import { Context, HTTPRequest, util } from '@aws-appsync/utils'


export function request(ctx: Context<any>): HTTPRequest {
    const id = ctx.arguments.id
    return {
        method: 'GET',
        resourcePath: `/todos/${id}`,
    };
}

export function response(ctx: Context<any>) {
    console.log("this is get-todo-function.js response()")
    console.log("Context: " + ctx);
    const { error, result } = ctx;
    if (error) {
        console.log("Error detected: " + error.message)
        return util.appendError(error.message, error.type, result);
    }
    console.log(ctx.result.body)
    return JSON.parse(ctx.result.body);
}
