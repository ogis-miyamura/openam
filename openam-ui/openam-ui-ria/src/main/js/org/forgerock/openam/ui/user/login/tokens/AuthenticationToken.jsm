/*
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
 * Copyright 2016 ForgeRock AS.
 * Portions copyright 2019 Open Source Solution Technology Corporation
 */

/**
 * The Authentication Token (authId) used by OpenAM to track an authentication session, usually
 * this is an unauthenticated users progress through an authentication chain.
 * @module org/forgerock/openam/ui/user/login/tokens/AuthenticationToken
 */

import CookieHelper from "org/forgerock/commons/ui/common/util/CookieHelper";
import Configuration from "org/forgerock/commons/ui/common/main/Configuration";

const cookieName = "authId";

function cookieDomains () {
    return Configuration.globalData.auth.cookieDomains;
}

function secureCookie () {
    return Configuration.globalData.auth.secureCookie;
}

export function set (token) {
    return CookieHelper.setCookie(cookieName, token, "", "/", cookieDomains(), secureCookie());
}

export function get () {
    const cookie = CookieHelper.getCookie(cookieName);
    if (cookie) {
        Configuration.globalData.auth.authenticateWithAuthIdCookie = true;
    }
    return cookie;
}

export function remove () {
    return CookieHelper.deleteCookie(cookieName, "/", cookieDomains());
}

export function had () {
    return Configuration.globalData.auth.authenticateWithAuthIdCookie;
}
