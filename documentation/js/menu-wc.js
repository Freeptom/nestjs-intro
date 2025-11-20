'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">nestjs-intro documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AppModule-bf9f254267e2555f04b3512eb09d6c8abb94ed4b2d18ee967ccbfaed86a333a7bd2bce89de2661de8529b9b511001bd0348358cef0a7f63ec05c9956e7e9f09b"' : 'data-bs-target="#xs-controllers-links-module-AppModule-bf9f254267e2555f04b3512eb09d6c8abb94ed4b2d18ee967ccbfaed86a333a7bd2bce89de2661de8529b9b511001bd0348358cef0a7f63ec05c9956e7e9f09b"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-bf9f254267e2555f04b3512eb09d6c8abb94ed4b2d18ee967ccbfaed86a333a7bd2bce89de2661de8529b9b511001bd0348358cef0a7f63ec05c9956e7e9f09b"' :
                                            'id="xs-controllers-links-module-AppModule-bf9f254267e2555f04b3512eb09d6c8abb94ed4b2d18ee967ccbfaed86a333a7bd2bce89de2661de8529b9b511001bd0348358cef0a7f63ec05c9956e7e9f09b"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppModule-bf9f254267e2555f04b3512eb09d6c8abb94ed4b2d18ee967ccbfaed86a333a7bd2bce89de2661de8529b9b511001bd0348358cef0a7f63ec05c9956e7e9f09b"' : 'data-bs-target="#xs-injectables-links-module-AppModule-bf9f254267e2555f04b3512eb09d6c8abb94ed4b2d18ee967ccbfaed86a333a7bd2bce89de2661de8529b9b511001bd0348358cef0a7f63ec05c9956e7e9f09b"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-bf9f254267e2555f04b3512eb09d6c8abb94ed4b2d18ee967ccbfaed86a333a7bd2bce89de2661de8529b9b511001bd0348358cef0a7f63ec05c9956e7e9f09b"' :
                                        'id="xs-injectables-links-module-AppModule-bf9f254267e2555f04b3512eb09d6c8abb94ed4b2d18ee967ccbfaed86a333a7bd2bce89de2661de8529b9b511001bd0348358cef0a7f63ec05c9956e7e9f09b"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AuthModule-5d31f41dff39ccf35a2e781ded2bbbd23017db40466fa3ee272efb734fb1016043132bcda708e27f53183f0e454b5975f2c3dbcf390af211bdf8ed5a935c6c6b"' : 'data-bs-target="#xs-controllers-links-module-AuthModule-5d31f41dff39ccf35a2e781ded2bbbd23017db40466fa3ee272efb734fb1016043132bcda708e27f53183f0e454b5975f2c3dbcf390af211bdf8ed5a935c6c6b"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-5d31f41dff39ccf35a2e781ded2bbbd23017db40466fa3ee272efb734fb1016043132bcda708e27f53183f0e454b5975f2c3dbcf390af211bdf8ed5a935c6c6b"' :
                                            'id="xs-controllers-links-module-AuthModule-5d31f41dff39ccf35a2e781ded2bbbd23017db40466fa3ee272efb734fb1016043132bcda708e27f53183f0e454b5975f2c3dbcf390af211bdf8ed5a935c6c6b"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                            <li class="link">
                                                <a href="controllers/GoogleAuthenticationController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GoogleAuthenticationController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AuthModule-5d31f41dff39ccf35a2e781ded2bbbd23017db40466fa3ee272efb734fb1016043132bcda708e27f53183f0e454b5975f2c3dbcf390af211bdf8ed5a935c6c6b"' : 'data-bs-target="#xs-injectables-links-module-AuthModule-5d31f41dff39ccf35a2e781ded2bbbd23017db40466fa3ee272efb734fb1016043132bcda708e27f53183f0e454b5975f2c3dbcf390af211bdf8ed5a935c6c6b"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-5d31f41dff39ccf35a2e781ded2bbbd23017db40466fa3ee272efb734fb1016043132bcda708e27f53183f0e454b5975f2c3dbcf390af211bdf8ed5a935c6c6b"' :
                                        'id="xs-injectables-links-module-AuthModule-5d31f41dff39ccf35a2e781ded2bbbd23017db40466fa3ee272efb734fb1016043132bcda708e27f53183f0e454b5975f2c3dbcf390af211bdf8ed5a935c6c6b"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/GenerateTokensProvider.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GenerateTokensProvider</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/GoogleAuthenticationService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GoogleAuthenticationService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/RefreshTokensProvider.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RefreshTokensProvider</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/SignInProvider.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SignInProvider</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/MailModule.html" data-type="entity-link" >MailModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-MailModule-3ce9f1e1ff28fd2e83caccc75da0ea298752de635770ee7fbebcab3a947f30e93c467c3984325277341af3b3e677813e353d15c7d8a531bb2145215dd6f65319"' : 'data-bs-target="#xs-injectables-links-module-MailModule-3ce9f1e1ff28fd2e83caccc75da0ea298752de635770ee7fbebcab3a947f30e93c467c3984325277341af3b3e677813e353d15c7d8a531bb2145215dd6f65319"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-MailModule-3ce9f1e1ff28fd2e83caccc75da0ea298752de635770ee7fbebcab3a947f30e93c467c3984325277341af3b3e677813e353d15c7d8a531bb2145215dd6f65319"' :
                                        'id="xs-injectables-links-module-MailModule-3ce9f1e1ff28fd2e83caccc75da0ea298752de635770ee7fbebcab3a947f30e93c467c3984325277341af3b3e677813e353d15c7d8a531bb2145215dd6f65319"' }>
                                        <li class="link">
                                            <a href="injectables/MailService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MailService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/MetaOptionsModule.html" data-type="entity-link" >MetaOptionsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-MetaOptionsModule-a6a2c519096f998498f78f05f868f85a655d556028c34336a3fd118746c0e5dafc88dd291dbd80e07b321f7113945fecba2b18a5d2436ff181c9e3ca20e7eaf7"' : 'data-bs-target="#xs-controllers-links-module-MetaOptionsModule-a6a2c519096f998498f78f05f868f85a655d556028c34336a3fd118746c0e5dafc88dd291dbd80e07b321f7113945fecba2b18a5d2436ff181c9e3ca20e7eaf7"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-MetaOptionsModule-a6a2c519096f998498f78f05f868f85a655d556028c34336a3fd118746c0e5dafc88dd291dbd80e07b321f7113945fecba2b18a5d2436ff181c9e3ca20e7eaf7"' :
                                            'id="xs-controllers-links-module-MetaOptionsModule-a6a2c519096f998498f78f05f868f85a655d556028c34336a3fd118746c0e5dafc88dd291dbd80e07b321f7113945fecba2b18a5d2436ff181c9e3ca20e7eaf7"' }>
                                            <li class="link">
                                                <a href="controllers/MetaOptionsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MetaOptionsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-MetaOptionsModule-a6a2c519096f998498f78f05f868f85a655d556028c34336a3fd118746c0e5dafc88dd291dbd80e07b321f7113945fecba2b18a5d2436ff181c9e3ca20e7eaf7"' : 'data-bs-target="#xs-injectables-links-module-MetaOptionsModule-a6a2c519096f998498f78f05f868f85a655d556028c34336a3fd118746c0e5dafc88dd291dbd80e07b321f7113945fecba2b18a5d2436ff181c9e3ca20e7eaf7"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-MetaOptionsModule-a6a2c519096f998498f78f05f868f85a655d556028c34336a3fd118746c0e5dafc88dd291dbd80e07b321f7113945fecba2b18a5d2436ff181c9e3ca20e7eaf7"' :
                                        'id="xs-injectables-links-module-MetaOptionsModule-a6a2c519096f998498f78f05f868f85a655d556028c34336a3fd118746c0e5dafc88dd291dbd80e07b321f7113945fecba2b18a5d2436ff181c9e3ca20e7eaf7"' }>
                                        <li class="link">
                                            <a href="injectables/MetaOptionsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MetaOptionsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PaginationModule.html" data-type="entity-link" >PaginationModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-PaginationModule-c999ec83fa446b9ea19d24ee0a6e56c581d86a5632cf36ae10c29d023d3c04796a0ed53a4d793419d8e1b10f6bd03438e096eafb9c8ddd56a9755c3470044f4b"' : 'data-bs-target="#xs-injectables-links-module-PaginationModule-c999ec83fa446b9ea19d24ee0a6e56c581d86a5632cf36ae10c29d023d3c04796a0ed53a4d793419d8e1b10f6bd03438e096eafb9c8ddd56a9755c3470044f4b"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PaginationModule-c999ec83fa446b9ea19d24ee0a6e56c581d86a5632cf36ae10c29d023d3c04796a0ed53a4d793419d8e1b10f6bd03438e096eafb9c8ddd56a9755c3470044f4b"' :
                                        'id="xs-injectables-links-module-PaginationModule-c999ec83fa446b9ea19d24ee0a6e56c581d86a5632cf36ae10c29d023d3c04796a0ed53a4d793419d8e1b10f6bd03438e096eafb9c8ddd56a9755c3470044f4b"' }>
                                        <li class="link">
                                            <a href="injectables/PaginationProvider.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PaginationProvider</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PostsModule.html" data-type="entity-link" >PostsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-PostsModule-e626783f6d0c0ca8aef9aca7c8c11d7cbb0a5d525a611dce18c7a5437f6bc2cbf9fc41ff84272ac29c4fe7d73592ae4697c9cb5e04a1babc76887d5e9a9f6701"' : 'data-bs-target="#xs-controllers-links-module-PostsModule-e626783f6d0c0ca8aef9aca7c8c11d7cbb0a5d525a611dce18c7a5437f6bc2cbf9fc41ff84272ac29c4fe7d73592ae4697c9cb5e04a1babc76887d5e9a9f6701"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-PostsModule-e626783f6d0c0ca8aef9aca7c8c11d7cbb0a5d525a611dce18c7a5437f6bc2cbf9fc41ff84272ac29c4fe7d73592ae4697c9cb5e04a1babc76887d5e9a9f6701"' :
                                            'id="xs-controllers-links-module-PostsModule-e626783f6d0c0ca8aef9aca7c8c11d7cbb0a5d525a611dce18c7a5437f6bc2cbf9fc41ff84272ac29c4fe7d73592ae4697c9cb5e04a1babc76887d5e9a9f6701"' }>
                                            <li class="link">
                                                <a href="controllers/PostsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PostsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-PostsModule-e626783f6d0c0ca8aef9aca7c8c11d7cbb0a5d525a611dce18c7a5437f6bc2cbf9fc41ff84272ac29c4fe7d73592ae4697c9cb5e04a1babc76887d5e9a9f6701"' : 'data-bs-target="#xs-injectables-links-module-PostsModule-e626783f6d0c0ca8aef9aca7c8c11d7cbb0a5d525a611dce18c7a5437f6bc2cbf9fc41ff84272ac29c4fe7d73592ae4697c9cb5e04a1babc76887d5e9a9f6701"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PostsModule-e626783f6d0c0ca8aef9aca7c8c11d7cbb0a5d525a611dce18c7a5437f6bc2cbf9fc41ff84272ac29c4fe7d73592ae4697c9cb5e04a1babc76887d5e9a9f6701"' :
                                        'id="xs-injectables-links-module-PostsModule-e626783f6d0c0ca8aef9aca7c8c11d7cbb0a5d525a611dce18c7a5437f6bc2cbf9fc41ff84272ac29c4fe7d73592ae4697c9cb5e04a1babc76887d5e9a9f6701"' }>
                                        <li class="link">
                                            <a href="injectables/CreatePostProvider.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CreatePostProvider</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/PostsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PostsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/TagsModule.html" data-type="entity-link" >TagsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-TagsModule-2bffe6740bcbaae2c08168354997d984c664b2168646a8f446773c6cfdc1173b7909ae500ddf27e12e17aa8acb4859b8411b64519ff727d91487eabd77defc9b"' : 'data-bs-target="#xs-controllers-links-module-TagsModule-2bffe6740bcbaae2c08168354997d984c664b2168646a8f446773c6cfdc1173b7909ae500ddf27e12e17aa8acb4859b8411b64519ff727d91487eabd77defc9b"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-TagsModule-2bffe6740bcbaae2c08168354997d984c664b2168646a8f446773c6cfdc1173b7909ae500ddf27e12e17aa8acb4859b8411b64519ff727d91487eabd77defc9b"' :
                                            'id="xs-controllers-links-module-TagsModule-2bffe6740bcbaae2c08168354997d984c664b2168646a8f446773c6cfdc1173b7909ae500ddf27e12e17aa8acb4859b8411b64519ff727d91487eabd77defc9b"' }>
                                            <li class="link">
                                                <a href="controllers/TagsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TagsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-TagsModule-2bffe6740bcbaae2c08168354997d984c664b2168646a8f446773c6cfdc1173b7909ae500ddf27e12e17aa8acb4859b8411b64519ff727d91487eabd77defc9b"' : 'data-bs-target="#xs-injectables-links-module-TagsModule-2bffe6740bcbaae2c08168354997d984c664b2168646a8f446773c6cfdc1173b7909ae500ddf27e12e17aa8acb4859b8411b64519ff727d91487eabd77defc9b"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-TagsModule-2bffe6740bcbaae2c08168354997d984c664b2168646a8f446773c6cfdc1173b7909ae500ddf27e12e17aa8acb4859b8411b64519ff727d91487eabd77defc9b"' :
                                        'id="xs-injectables-links-module-TagsModule-2bffe6740bcbaae2c08168354997d984c664b2168646a8f446773c6cfdc1173b7909ae500ddf27e12e17aa8acb4859b8411b64519ff727d91487eabd77defc9b"' }>
                                        <li class="link">
                                            <a href="injectables/TagsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TagsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UploadsModule.html" data-type="entity-link" >UploadsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-UploadsModule-1c8d5b6c41f1a263c4d0f2a7fec8bdfd79b933f67b8ca53b4cca015f05c8cb24e380082991bcf5876d4d4544915db540b5d7455d650a48848dbe3919cf3d6568"' : 'data-bs-target="#xs-controllers-links-module-UploadsModule-1c8d5b6c41f1a263c4d0f2a7fec8bdfd79b933f67b8ca53b4cca015f05c8cb24e380082991bcf5876d4d4544915db540b5d7455d650a48848dbe3919cf3d6568"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UploadsModule-1c8d5b6c41f1a263c4d0f2a7fec8bdfd79b933f67b8ca53b4cca015f05c8cb24e380082991bcf5876d4d4544915db540b5d7455d650a48848dbe3919cf3d6568"' :
                                            'id="xs-controllers-links-module-UploadsModule-1c8d5b6c41f1a263c4d0f2a7fec8bdfd79b933f67b8ca53b4cca015f05c8cb24e380082991bcf5876d4d4544915db540b5d7455d650a48848dbe3919cf3d6568"' }>
                                            <li class="link">
                                                <a href="controllers/UploadsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UploadsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-UploadsModule-1c8d5b6c41f1a263c4d0f2a7fec8bdfd79b933f67b8ca53b4cca015f05c8cb24e380082991bcf5876d4d4544915db540b5d7455d650a48848dbe3919cf3d6568"' : 'data-bs-target="#xs-injectables-links-module-UploadsModule-1c8d5b6c41f1a263c4d0f2a7fec8bdfd79b933f67b8ca53b4cca015f05c8cb24e380082991bcf5876d4d4544915db540b5d7455d650a48848dbe3919cf3d6568"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UploadsModule-1c8d5b6c41f1a263c4d0f2a7fec8bdfd79b933f67b8ca53b4cca015f05c8cb24e380082991bcf5876d4d4544915db540b5d7455d650a48848dbe3919cf3d6568"' :
                                        'id="xs-injectables-links-module-UploadsModule-1c8d5b6c41f1a263c4d0f2a7fec8bdfd79b933f67b8ca53b4cca015f05c8cb24e380082991bcf5876d4d4544915db540b5d7455d650a48848dbe3919cf3d6568"' }>
                                        <li class="link">
                                            <a href="injectables/UploadToAwsProvider.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UploadToAwsProvider</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UploadsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UploadsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UsersModule.html" data-type="entity-link" >UsersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-UsersModule-a24eeac8c66c255b71b8b8b7465ceda47f0f8101e290978bf317dcb17b3afba9e2a099ba9ec880bf54067e8f031f04eb9a24855eb14df8463d8b22115edc5bdb"' : 'data-bs-target="#xs-controllers-links-module-UsersModule-a24eeac8c66c255b71b8b8b7465ceda47f0f8101e290978bf317dcb17b3afba9e2a099ba9ec880bf54067e8f031f04eb9a24855eb14df8463d8b22115edc5bdb"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UsersModule-a24eeac8c66c255b71b8b8b7465ceda47f0f8101e290978bf317dcb17b3afba9e2a099ba9ec880bf54067e8f031f04eb9a24855eb14df8463d8b22115edc5bdb"' :
                                            'id="xs-controllers-links-module-UsersModule-a24eeac8c66c255b71b8b8b7465ceda47f0f8101e290978bf317dcb17b3afba9e2a099ba9ec880bf54067e8f031f04eb9a24855eb14df8463d8b22115edc5bdb"' }>
                                            <li class="link">
                                                <a href="controllers/UsersController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-UsersModule-a24eeac8c66c255b71b8b8b7465ceda47f0f8101e290978bf317dcb17b3afba9e2a099ba9ec880bf54067e8f031f04eb9a24855eb14df8463d8b22115edc5bdb"' : 'data-bs-target="#xs-injectables-links-module-UsersModule-a24eeac8c66c255b71b8b8b7465ceda47f0f8101e290978bf317dcb17b3afba9e2a099ba9ec880bf54067e8f031f04eb9a24855eb14df8463d8b22115edc5bdb"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UsersModule-a24eeac8c66c255b71b8b8b7465ceda47f0f8101e290978bf317dcb17b3afba9e2a099ba9ec880bf54067e8f031f04eb9a24855eb14df8463d8b22115edc5bdb"' :
                                        'id="xs-injectables-links-module-UsersModule-a24eeac8c66c255b71b8b8b7465ceda47f0f8101e290978bf317dcb17b3afba9e2a099ba9ec880bf54067e8f031f04eb9a24855eb14df8463d8b22115edc5bdb"' }>
                                        <li class="link">
                                            <a href="injectables/CreateGoogleUserProvider.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CreateGoogleUserProvider</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/CreateUserProvider.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CreateUserProvider</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/FindOneByGoogleIdProvider.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FindOneByGoogleIdProvider</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/FindOneUserByEmailProvider.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FindOneUserByEmailProvider</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UsersCreateManyProvider.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersCreateManyProvider</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UsersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#entities-links"' :
                                'data-bs-target="#xs-entities-links"' }>
                                <span class="icon ion-ios-apps"></span>
                                <span>Entities</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="entities-links"' : 'id="xs-entities-links"' }>
                                <li class="link">
                                    <a href="entities/MetaOption.html" data-type="entity-link" >MetaOption</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Post.html" data-type="entity-link" >Post</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Tag.html" data-type="entity-link" >Tag</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Upload.html" data-type="entity-link" >Upload</a>
                                </li>
                                <li class="link">
                                    <a href="entities/User.html" data-type="entity-link" >User</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/CreateManyUsersDto.html" data-type="entity-link" >CreateManyUsersDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreatePostDto.html" data-type="entity-link" >CreatePostDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreatePostMetaOptionsDto.html" data-type="entity-link" >CreatePostMetaOptionsDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateTagDto.html" data-type="entity-link" >CreateTagDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateUserDto.html" data-type="entity-link" >CreateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetPostBaseDto.html" data-type="entity-link" >GetPostBaseDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetPostsDto.html" data-type="entity-link" >GetPostsDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetUserBaseDto.html" data-type="entity-link" >GetUserBaseDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetUsersDto.html" data-type="entity-link" >GetUsersDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetUsersParamDto.html" data-type="entity-link" >GetUsersParamDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/GoogleTokenDto.html" data-type="entity-link" >GoogleTokenDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/PaginationQueryDto.html" data-type="entity-link" >PaginationQueryDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/PatchPostDto.html" data-type="entity-link" >PatchPostDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/PatchUserDto.html" data-type="entity-link" >PatchUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/RefreshTokenDto.html" data-type="entity-link" >RefreshTokenDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/SignInDto.html" data-type="entity-link" >SignInDto</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/BcryptProvider.html" data-type="entity-link" >BcryptProvider</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DataResponseInterceptor.html" data-type="entity-link" >DataResponseInterceptor</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/HashingProvider.html" data-type="entity-link" >HashingProvider</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#guards-links"' :
                            'data-bs-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/AccessTokenGuard.html" data-type="entity-link" >AccessTokenGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/AuthenticationGuard.html" data-type="entity-link" >AuthenticationGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/ActiveUserData.html" data-type="entity-link" >ActiveUserData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AuthenticatedRequest.html" data-type="entity-link" >AuthenticatedRequest</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GoogleUser.html" data-type="entity-link" >GoogleUser</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/JwtPayload.html" data-type="entity-link" >JwtPayload</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Paginated.html" data-type="entity-link" >Paginated</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UploadedFile.html" data-type="entity-link" >UploadedFile</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});