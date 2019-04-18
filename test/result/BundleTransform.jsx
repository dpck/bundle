// processes a single file
import { h } from 'preact'

/* expected */
import { h } from '../node_modules/preact/dist/preact.mjs'
/**/

// processes dependency with paths
import { h } from 'preact/src/preact'

/* expected */
import { h } from '../node_modules/preact/src/preact.js'
/**/