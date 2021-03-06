<script lang="ts">
    import { network, sites } from '$stores/sites'
    import { theme, handleTheme } from '$stores/theme'
    import { page } from '$app/stores'
    import Options from '$parts/Options.svelte'

    import Dark from '$icons/dark.svg'
    import Light from '$icons/light.svg'

    $: current = $page.url.pathname.split('/')[1]
</script>

<aside id="panel">
    <section id="sites">
        <nav>
            <menu>
                <li class:current={current === network.name}>
                    <a href="/{network.name}/dashboard" class="siteLink">
                        <img src="/sites/small/{network.name}.jpg" alt="NetworkSmall">
                        <span>{network.name}</span>
                    </a>
                </li>
                {#each $sites as site}
                    <li class:current={current === site.name}>
                        <a href="/{site.name}/dashboard" class="siteLink">
                            <img src="/sites/small/{site.name}.jpg" alt="{site.name}Small">
                            <span>{site.displayName}</span>
                        </a>
                    </li>
                {/each}
            </menu>
        </nav>
        <section id="theme">
            <input hidden type="checkbox" checked={$theme === 'dark'} name="themeInput" id="themeInput" on:change={handleTheme}/>
            <label for="themeInput" id="themeSwitcher">
                {#if $theme === 'dark'}
                    <Light />
                {:else}
                    <Dark />
                {/if}
            </label>
        </section>
    </section>
    <Options />
</aside>

<style lang="scss">
    #panel {
        box-shadow: var(--shadow);
        background-color: var(--primary);
        display: flex;
        gap: 10px;

        > section {
            display: flex;
            flex-direction: column;
            justify-content: space-between;

            nav menu {
                display: flex;
                flex-direction: column;
                gap: 10px;
            }
        }
        #sites {
            margin-top: 20px;

            nav menu {
                li:first-child {
                    margin-bottom: 30px;

                    &:after {
                        content: '';
                        background-color: var(--secondary);
                        position: absolute;
                        bottom: -20px;
                        left: 20%;
                        width: 60%;
                        height: 2px;
                    }
                }
                li.current > .siteLink,
                li:not(.current) .siteLink:hover {
                    background-color: var(--highlight);
                    border-radius: 35%;

                    &::before {
                        background-color: var(--highlight);
                    }
                }
                li.current > .siteLink {
                    &::before {
                        height: 90%;
                    }
                }
                li:not(.current) .siteLink:hover {
                    &::before {
                        height: 30px;
                    }
                }
                li {
                    position: relative;
                    margin-left: 15px;

                    .siteLink {
                        overflow: hidden;
                        border-radius: 50%;
                        background-color: var(--secondary);
                        color: var(--text);
                        width: 60px;
                        height: 60px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        cursor: pointer;
                        transition: all 400ms ease;

                        &:hover {
                            span {
                                left: 150%;
                                min-width: 100px;
                                opacity: 1;
                            }
                        }
                        &::before {
                            content: '';
                            position: absolute;
                            left: -15px;
                            border-radius: 0 10px 10px 0;
                            background-color: var(--secondary);
                            width: 8px;
                            height: 15px;
                            transition: height 300ms ease;
                        }
                        span {
                            box-shadow: var(--shadow);
                            border-radius: var(--radius);
                            background-color: var(--primary);
                            position: absolute;
                            left: -200%;
                            height: 40px;
                            width: 0px;
                            opacity: 0;
                            display: flex;
                            align-items: center;
                            z-index: 101;
                            transition: opacity 300ms ease;

                            &::before {
                                content: '';
                                position: relative;
                                left: -20px;
                                border-top: 10px solid transparent;
                                border-left: 10px solid transparent;
                                border-right: 10px solid var(--primary);
                                border-bottom: 10px solid transparent;
                            }
                        }
                    }
                }
            }
            #theme {
                #themeInput {
                    &:checked + #themeSwitcher { 
                        :global(svg) {
                            order: 1;
                        }
                        &:before {
                            order: 2;
                        }
                    }
                }
                #themeSwitcher {
                    border: 3px solid var(--text);
                    border-radius: 20px;
                    margin: 0 0 10px 10px;
                    padding: 2px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    width: 80%;
                    height: 30px;
                    cursor: pointer;

                    :global(svg) {
                        width: 20px !important;
                        height: 20px !important;
                    }
                    &:before {
                        content: '';
                        background-color: var(--highlight);
                        border-radius: 50%;
                        height: 20px;
                        width: 20px;
                    }
                }
            }
        }
    }
</style>