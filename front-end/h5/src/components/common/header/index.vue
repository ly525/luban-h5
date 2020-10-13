<template>
  <a-layout-header class="layout-header">
    <LogoOfHeader />
    <div style="float:right;">
      <Links />
    <slot name="action-menu"></slot>
    <LangSelect />
    </div>
  </a-layout-header>
</template>
<script>
import LogoOfHeader from './logo.js'
import LangSelect from './LangSelect'
import Links from './links'
export default {
  name: 'Header',
  components: {
    LogoOfHeader,
    LangSelect,
    Links
  }
}
</script>
<style lang="scss" scoped>
.layout-header {
  padding: 0 10px;
  .logo {
    width: 120px;
    height: 31px;
    margin: 16px 28px 16px 0;
    float: left;

    line-height: 31px;
    text-align: center;
    color: white;
    font-size: 16px;
  }

  .lang-select-activator,
  .user-avatar-activator {
    // float: right;
    background: transparent;
    margin: 0 28px 16px 0;
    cursor: pointer;

    .anticon {
      color: white;
    }
  }
}
</style>
