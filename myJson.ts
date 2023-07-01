/** @format */

import { useData } from "https://deno.land/x/aleph@1.0.0-beta.43/framework/react/data.ts";

export function json<T extends unknown>(
	data: T,
	init: ResponseInit | number = {}
) {
	const responseInit = typeof init === "number" ? { status: init } : init;
	const headers = new Headers(responseInit.headers);
	if (!headers.has("Content-Type")) {
		headers.set("Content-Type", "application/json; charset=utf-8");
	}
	return new Response(JSON.stringify({ data, __meta__: "A value" }), {
		...responseInit,
		headers,
	});
}

export function useMyData<T = unknown>() {
	const { data, ...rest } = useData();
	console.log(data);
	let typedData: T;
	if ("data" in data) {
		typedData = data.data as T;
	} else {
		typedData = data as T;
	}
	return { data: typedData, ...rest };
}
