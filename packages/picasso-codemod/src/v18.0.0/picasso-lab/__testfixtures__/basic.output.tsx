// comment 1
/* comment 2 */
/**
 * @time Tue 08 Feb 2022 12:04:13 PM +04
 *
 * docs
 */
/* Only these cases can have deeper imports according to picasso guidelines */
import { _TestUtils } from '@toptal/picasso/test-utils';
import { _Utils } from '@toptal/picasso/utils';
import { _Icon1 } from '@toptal/picasso/Icon';

import _Picasso2, {
 _ExistingComponent1,
 _ExistingComponent2,
 _Component1,
 _Component2,
 _Component3,
 _Component1Type,
 default as _Component5Default,
 Component6 as _CustomName1,
} from '@toptal/picasso';

import { _MUI } from 'mui'
/* @ts-rule */
import { _useState } from 'react'

import * as _PicassoLab from '@toptal/picasso'
import * as _Picasso1 from '@toptal/picasso'

import { _NOT_EFFECTED1 } from '@toptal/picasso-shared'

import { _NOT_EFFECTED2 } from '../RelativePath'

const foo = (res: string) => res

foo('@toptal/picasso')
