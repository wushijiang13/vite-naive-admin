import {app} from '@/config/vue/app'

import power from "./src/power";
import preventReClick from "./src/preventReClick";
import emoji from "./src/emoji";
import intNumber from "./src/int";
import amount from "./src/amount";

[power, preventReClick, emoji, intNumber, amount].map(
    (directive: any) => app.directive(directive.name, directive));


