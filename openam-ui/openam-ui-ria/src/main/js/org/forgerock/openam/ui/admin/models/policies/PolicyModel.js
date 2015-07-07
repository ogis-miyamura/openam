/**
 * The contents of this file are subject to the terms of the Common Development and
 * Distribution License (the License). You may not use this file except in compliance with the
 * License.
 *
 * You can obtain a copy of the License at legal/CDDLv1.0.txt. See the License for the
 * specific language governing permission and limitations under the License.
 *
 * When distributing Covered Software, include this CDDL Header Notice in each file and include
 * the License file at legal/CDDLv1.0.txt. If applicable, add the following below the CDDL
 * Header, with the fields enclosed by brackets [] replaced by your own identifying
 * information: "Portions copyright [year] [name of copyright owner]".
 *
 * Copyright 2015 ForgeRock AS.
 */

/*global define*/
define("org/forgerock/openam/ui/admin/models/policies/PolicyModel", [
    "underscore",
    "backbone",
    // TODO: switch to 'org/forgerock/openam/ui/common/util/URLHelper' after PE and SE are deleted
    "org/forgerock/openam/ui/uma/util/URLHelper"
], function (_, Backbone, URLHelper) {
    return Backbone.Model.extend({
        idAttribute: "name",
        urlRoot: URLHelper.substitute("__api__/policies"),

        defaults: function () {
            return {
                name: null,
                description: "",
                resources: [],
                actionValues: {}
            };
        },

        validate: function (attrs, options) {
            if (attrs.name.trim() === "") {
                return "policyErrorNoName";
            }

            // entities that are stored in LDAP can't start with '#'. http://www.jguru.com/faq/view.jsp?EID=113588
            if (attrs.name.startsWith("#")) {
                return "policyErrorCantStartWithHash";
            }

            if (attrs.resources.length === 0) {
                return "policyErrorNoResources";
            }

            if (_.isEmpty(attrs.actionValues)) {
                return "policyErrorNoActions";
            }
        },

        sync: function (method, model, options) {
            options.beforeSend = function (xhr) {
                xhr.setRequestHeader("Accept-API-Version", "protocol=1.0,resource=2.0");
            };

            if (model.id === null) {
                method = "create";

                options = options || {};
                options.url = this.urlRoot() + "/?_action=create";
            }

            return Backbone.Model.prototype.sync.call(this, method, model, options);
        }
    });
});