/*
 *  This file is part of Moeditor.
 *
 *  Copyright (c) 2016 Menci <huanghaorui301@gmail.com>
 *
 *  Moeditor is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  Moeditor is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with Moeditor. If not, see <http://www.gnu.org/licenses/>.
 */

'use strict';

document.addEventListener('DOMContentLoaded', function() {
    window.moeApp = require('electron').remote.app.moeApp;

    const ipcRenderer = require('electron').ipcRenderer;

    const items = document.getElementsByClassName('settings-item');
    for (const item of items) {
        const key = item.getAttribute('data-key');
        const oldVal = moeApp.config.get(key);
        if (item.tagName === 'SELECT' || item.tagName === 'INPUT' || item.tagName === 'TEXTAREA') {
            item.value = oldVal;
            item.addEventListener('change', function() {
                const val = item.value;
                console.log(key + ': ' + val);
                moeApp.config.set(key, val);
                ipcRenderer.send('setting-changed', { key: key, val: val });
            });
        }
    }
});
