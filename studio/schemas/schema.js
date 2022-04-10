import createSchema from "part:@sanity/base/schema-creator";
import schemaTypes from "all:part:@sanity/base/schema-type";

import { user } from "./user.js";
import { transaction } from "./transaction.js";


export default createSchema({
  name: "default",
  types: schemaTypes.concat([user, transaction]),
});
