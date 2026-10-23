// eslint-disable-next-line @typescript-eslint/triple-slash-reference -- the virtual module is declared next to this file
/// <reference path="./openapi-virtual.d.ts" />
import { defineEventHandler } from 'h3'
import document from '#typesense/openapi'

export default defineEventHandler(() => document)
