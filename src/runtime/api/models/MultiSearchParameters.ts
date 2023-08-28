/* tslint:disable */
/* eslint-disable */
/**
 * Typesense API
 * An open source search engine for building delightful search experiences.
 *
 * The version of the OpenAPI document: 0.24.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
/**
 * Parameters for the multi search API.
 * @export
 * @interface MultiSearchParameters
 */
export interface MultiSearchParameters {
    /**
     * The query text to search for in the collection. Use * as the search string to return all documents. This is typically useful when used in conjunction with filter_by.
     * @type {string}
     * @memberof MultiSearchParameters
     */
    q?: string;
    /**
     * A list of `string` fields that should be queried against. Multiple fields are separated with a comma.
     * @type {string}
     * @memberof MultiSearchParameters
     */
    queryBy?: string;
    /**
     * The relative weight to give each `query_by` field when ranking results. This can be used to boost fields in priority, when looking for matches. Multiple fields are separated with a comma.
     * @type {string}
     * @memberof MultiSearchParameters
     */
    queryByWeights?: string;
    /**
     * Boolean field to indicate that the last word in the query should be treated as a prefix, and not as a whole word. This is used for building autocomplete and instant search interfaces. Defaults to true.
     * @type {string}
     * @memberof MultiSearchParameters
     */
    prefix?: string;
    /**
     * If infix index is enabled for this field, infix searching can be done on a per-field basis by sending a comma separated string parameter called infix to the search query. This parameter can have 3 values; `off` infix search is disabled, which is default `always` infix search is performed along with regular search `fallback` infix search is performed if regular search does not produce results
     * @type {string}
     * @memberof MultiSearchParameters
     */
    infix?: string;
    /**
     * There are also 2 parameters that allow you to control the extent of infix searching max_extra_prefix and max_extra_suffix which specify the maximum number of symbols before or after the query that can be present in the token. For example query "K2100" has 2 extra symbols in "6PK2100". By default, any number of prefixes/suffixes can be present for a match.
     * @type {number}
     * @memberof MultiSearchParameters
     */
    maxExtraPrefix?: number;
    /**
     * There are also 2 parameters that allow you to control the extent of infix searching max_extra_prefix and max_extra_suffix which specify the maximum number of symbols before or after the query that can be present in the token. For example query "K2100" has 2 extra symbols in "6PK2100". By default, any number of prefixes/suffixes can be present for a match.
     * @type {number}
     * @memberof MultiSearchParameters
     */
    maxExtraSuffix?: number;
    /**
     * Filter conditions for refining youropen api validator search results. Separate multiple conditions with &&.
     * @type {string}
     * @memberof MultiSearchParameters
     */
    filterBy?: string;
    /**
     * A list of numerical fields and their corresponding sort orders that will be used for ordering your results. Up to 3 sort fields can be specified. The text similarity score is exposed as a special `_text_match` field that you can use in the list of sorting fields. If no `sort_by` parameter is specified, results are sorted by `_text_match:desc,default_sorting_field:desc`
     * @type {string}
     * @memberof MultiSearchParameters
     */
    sortBy?: string;
    /**
     * A list of fields that will be used for faceting your results on. Separate multiple fields with a comma.
     * @type {string}
     * @memberof MultiSearchParameters
     */
    facetBy?: string;
    /**
     * Maximum number of facet values to be returned.
     * @type {number}
     * @memberof MultiSearchParameters
     */
    maxFacetValues?: number;
    /**
     * Facet values that are returned can now be filtered via this parameter. The matching facet text is also highlighted. For example, when faceting by `category`, you can set `facet_query=category:shoe` to return only facet values that contain the prefix "shoe".
     * @type {string}
     * @memberof MultiSearchParameters
     */
    facetQuery?: string;
    /**
     * The number of typographical errors (1 or 2) that would be tolerated. Default: 2
     * @type {string}
     * @memberof MultiSearchParameters
     */
    numTypos?: string;
    /**
     * Results from this specific page number would be fetched.
     * @type {number}
     * @memberof MultiSearchParameters
     */
    page?: number;
    /**
     * Number of results to fetch per page. Default: 10
     * @type {number}
     * @memberof MultiSearchParameters
     */
    perPage?: number;
    /**
     * You can aggregate search results into groups or buckets by specify one or more `group_by` fields. Separate multiple fields with a comma. To group on a particular field, it must be a faceted field.
     * @type {string}
     * @memberof MultiSearchParameters
     */
    groupBy?: string;
    /**
     * Maximum number of hits to be returned for every group. If the `group_limit` is set as `K` then only the top K hits in each group are returned in the response. Default: 3
     * @type {number}
     * @memberof MultiSearchParameters
     */
    groupLimit?: number;
    /**
     * List of fields from the document to include in the search result
     * @type {string}
     * @memberof MultiSearchParameters
     */
    includeFields?: string;
    /**
     * List of fields from the document to exclude in the search result
     * @type {string}
     * @memberof MultiSearchParameters
     */
    excludeFields?: string;
    /**
     * List of fields which should be highlighted fully without snippeting
     * @type {string}
     * @memberof MultiSearchParameters
     */
    highlightFullFields?: string;
    /**
     * The number of tokens that should surround the highlighted text on each side. Default: 4
     * @type {number}
     * @memberof MultiSearchParameters
     */
    highlightAffixNumTokens?: number;
    /**
     * The start tag used for the highlighted snippets. Default: `<mark>`
     * @type {string}
     * @memberof MultiSearchParameters
     */
    highlightStartTag?: string;
    /**
     * The end tag used for the highlighted snippets. Default: `</mark>`
     * @type {string}
     * @memberof MultiSearchParameters
     */
    highlightEndTag?: string;
    /**
     * Field values under this length will be fully highlighted, instead of showing a snippet of relevant portion. Default: 30
     * @type {number}
     * @memberof MultiSearchParameters
     */
    snippetThreshold?: number;
    /**
     * If the number of results found for a specific query is less than this number, Typesense will attempt to drop the tokens in the query until enough results are found. Tokens that have the least individual hits are dropped first. Set to 0 to disable. Default: 10
     * @type {number}
     * @memberof MultiSearchParameters
     */
    dropTokensThreshold?: number;
    /**
     * If the number of results found for a specific query is less than this number, Typesense will attempt to look for tokens with more typos until enough results are found. Default: 100
     * @type {number}
     * @memberof MultiSearchParameters
     */
    typoTokensThreshold?: number;
    /**
     * A list of records to unconditionally include in the search results at specific positions. An example use case would be to feature or promote certain items on the top of search results. A list of `record_id:hit_position`. Eg: to include a record with ID 123 at Position 1 and another record with ID 456 at Position 5, you'd specify `123:1,456:5`.
     * You could also use the Overrides feature to override search results based on rules. Overrides are applied first, followed by `pinned_hits` and  finally `hidden_hits`.
     * @type {string}
     * @memberof MultiSearchParameters
     */
    pinnedHits?: string;
    /**
     * A list of records to unconditionally hide from search results. A list of `record_id`s to hide. Eg: to hide records with IDs 123 and 456, you'd specify `123,456`.
     * You could also use the Overrides feature to override search results based on rules. Overrides are applied first, followed by `pinned_hits` and finally `hidden_hits`.
     * @type {string}
     * @memberof MultiSearchParameters
     */
    hiddenHits?: string;
    /**
     * A list of custom fields that must be highlighted even if you don't query  for them
     * @type {string}
     * @memberof MultiSearchParameters
     */
    highlightFields?: string;
    /**
     * You can index content from any logographic language into Typesense if you are able to segment / split the text into space-separated words yourself  before indexing and querying.
     * Set this parameter to true to do the same
     * @type {boolean}
     * @memberof MultiSearchParameters
     */
    preSegmentedQuery?: boolean;
    /**
     * Search using a bunch of search parameters by setting this parameter to the name of the existing Preset.
     * @type {string}
     * @memberof MultiSearchParameters
     */
    preset?: string;
    /**
     * If you have some overrides defined but want to disable all of them during query time, you can do that by setting this parameter to false
     * @type {boolean}
     * @memberof MultiSearchParameters
     */
    enableOverrides?: boolean;
    /**
     * Set this parameter to true to ensure that an exact match is ranked above the others
     * @type {boolean}
     * @memberof MultiSearchParameters
     */
    prioritizeExactMatch?: boolean;
    /**
     * Setting this to true will make Typesense consider all prefixes and typo  corrections of the words in the query without stopping early when enough results are found  (drop_tokens_threshold and typo_tokens_threshold configurations are ignored).
     * @type {boolean}
     * @memberof MultiSearchParameters
     */
    exhaustiveSearch?: boolean;
    /**
     * Typesense will attempt to return results early if the cutoff time has elapsed.  This is not a strict guarantee and facet computation is not bound by this parameter.
     * @type {number}
     * @memberof MultiSearchParameters
     */
    searchCutoffMs?: number;
    /**
     * Enable server side caching of search query results. By default, caching is disabled.
     * @type {boolean}
     * @memberof MultiSearchParameters
     */
    useCache?: boolean;
    /**
     * The duration (in seconds) that determines how long the search query is cached.  This value can be set on a per-query basis. Default: 60.
     * @type {number}
     * @memberof MultiSearchParameters
     */
    cacheTtl?: number;
    /**
     * Minimum word length for 1-typo correction to be applied.  The value of num_typos is still treated as the maximum allowed typos.
     * @type {number}
     * @memberof MultiSearchParameters
     */
    minLen1typo?: number;
    /**
     * Minimum word length for 2-typo correction to be applied.  The value of num_typos is still treated as the maximum allowed typos.
     * @type {number}
     * @memberof MultiSearchParameters
     */
    minLen2typo?: number;
    /**
     * Vector query expression for fetching documents "closest" to a given query/document vector.
     * @type {string}
     * @memberof MultiSearchParameters
     */
    vectorQuery?: string;
}

/**
 * Check if a given object implements the MultiSearchParameters interface.
 */
export function instanceOfMultiSearchParameters(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function MultiSearchParametersFromJSON(json: any): MultiSearchParameters {
    return MultiSearchParametersFromJSONTyped(json, false);
}

export function MultiSearchParametersFromJSONTyped(json: any, ignoreDiscriminator: boolean): MultiSearchParameters {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'q': !exists(json, 'q') ? undefined : json['q'],
        'queryBy': !exists(json, 'query_by') ? undefined : json['query_by'],
        'queryByWeights': !exists(json, 'query_by_weights') ? undefined : json['query_by_weights'],
        'prefix': !exists(json, 'prefix') ? undefined : json['prefix'],
        'infix': !exists(json, 'infix') ? undefined : json['infix'],
        'maxExtraPrefix': !exists(json, 'max_extra_prefix') ? undefined : json['max_extra_prefix'],
        'maxExtraSuffix': !exists(json, 'max_extra_suffix') ? undefined : json['max_extra_suffix'],
        'filterBy': !exists(json, 'filter_by') ? undefined : json['filter_by'],
        'sortBy': !exists(json, 'sort_by') ? undefined : json['sort_by'],
        'facetBy': !exists(json, 'facet_by') ? undefined : json['facet_by'],
        'maxFacetValues': !exists(json, 'max_facet_values') ? undefined : json['max_facet_values'],
        'facetQuery': !exists(json, 'facet_query') ? undefined : json['facet_query'],
        'numTypos': !exists(json, 'num_typos') ? undefined : json['num_typos'],
        'page': !exists(json, 'page') ? undefined : json['page'],
        'perPage': !exists(json, 'per_page') ? undefined : json['per_page'],
        'groupBy': !exists(json, 'group_by') ? undefined : json['group_by'],
        'groupLimit': !exists(json, 'group_limit') ? undefined : json['group_limit'],
        'includeFields': !exists(json, 'include_fields') ? undefined : json['include_fields'],
        'excludeFields': !exists(json, 'exclude_fields') ? undefined : json['exclude_fields'],
        'highlightFullFields': !exists(json, 'highlight_full_fields') ? undefined : json['highlight_full_fields'],
        'highlightAffixNumTokens': !exists(json, 'highlight_affix_num_tokens') ? undefined : json['highlight_affix_num_tokens'],
        'highlightStartTag': !exists(json, 'highlight_start_tag') ? undefined : json['highlight_start_tag'],
        'highlightEndTag': !exists(json, 'highlight_end_tag') ? undefined : json['highlight_end_tag'],
        'snippetThreshold': !exists(json, 'snippet_threshold') ? undefined : json['snippet_threshold'],
        'dropTokensThreshold': !exists(json, 'drop_tokens_threshold') ? undefined : json['drop_tokens_threshold'],
        'typoTokensThreshold': !exists(json, 'typo_tokens_threshold') ? undefined : json['typo_tokens_threshold'],
        'pinnedHits': !exists(json, 'pinned_hits') ? undefined : json['pinned_hits'],
        'hiddenHits': !exists(json, 'hidden_hits') ? undefined : json['hidden_hits'],
        'highlightFields': !exists(json, 'highlight_fields') ? undefined : json['highlight_fields'],
        'preSegmentedQuery': !exists(json, 'pre_segmented_query') ? undefined : json['pre_segmented_query'],
        'preset': !exists(json, 'preset') ? undefined : json['preset'],
        'enableOverrides': !exists(json, 'enable_overrides') ? undefined : json['enable_overrides'],
        'prioritizeExactMatch': !exists(json, 'prioritize_exact_match') ? undefined : json['prioritize_exact_match'],
        'exhaustiveSearch': !exists(json, 'exhaustive_search') ? undefined : json['exhaustive_search'],
        'searchCutoffMs': !exists(json, 'search_cutoff_ms') ? undefined : json['search_cutoff_ms'],
        'useCache': !exists(json, 'use_cache') ? undefined : json['use_cache'],
        'cacheTtl': !exists(json, 'cache_ttl') ? undefined : json['cache_ttl'],
        'minLen1typo': !exists(json, 'min_len_1typo') ? undefined : json['min_len_1typo'],
        'minLen2typo': !exists(json, 'min_len_2typo') ? undefined : json['min_len_2typo'],
        'vectorQuery': !exists(json, 'vector_query') ? undefined : json['vector_query'],
    };
}

export function MultiSearchParametersToJSON(value?: MultiSearchParameters | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'q': value.q,
        'query_by': value.queryBy,
        'query_by_weights': value.queryByWeights,
        'prefix': value.prefix,
        'infix': value.infix,
        'max_extra_prefix': value.maxExtraPrefix,
        'max_extra_suffix': value.maxExtraSuffix,
        'filter_by': value.filterBy,
        'sort_by': value.sortBy,
        'facet_by': value.facetBy,
        'max_facet_values': value.maxFacetValues,
        'facet_query': value.facetQuery,
        'num_typos': value.numTypos,
        'page': value.page,
        'per_page': value.perPage,
        'group_by': value.groupBy,
        'group_limit': value.groupLimit,
        'include_fields': value.includeFields,
        'exclude_fields': value.excludeFields,
        'highlight_full_fields': value.highlightFullFields,
        'highlight_affix_num_tokens': value.highlightAffixNumTokens,
        'highlight_start_tag': value.highlightStartTag,
        'highlight_end_tag': value.highlightEndTag,
        'snippet_threshold': value.snippetThreshold,
        'drop_tokens_threshold': value.dropTokensThreshold,
        'typo_tokens_threshold': value.typoTokensThreshold,
        'pinned_hits': value.pinnedHits,
        'hidden_hits': value.hiddenHits,
        'highlight_fields': value.highlightFields,
        'pre_segmented_query': value.preSegmentedQuery,
        'preset': value.preset,
        'enable_overrides': value.enableOverrides,
        'prioritize_exact_match': value.prioritizeExactMatch,
        'exhaustive_search': value.exhaustiveSearch,
        'search_cutoff_ms': value.searchCutoffMs,
        'use_cache': value.useCache,
        'cache_ttl': value.cacheTtl,
        'min_len_1typo': value.minLen1typo,
        'min_len_2typo': value.minLen2typo,
        'vector_query': value.vectorQuery,
    };
}
