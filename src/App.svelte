<script>
// child components
import InfoBox from "./components/InfoBox/InfoBox.svelte";
import Header from './layout/Header.svelte';
import MainContent from './layout/MainContent.svelte';	
import Footer from './layout/Footer.svelte';	
</script>

<div class="" id="wrapper">

	<Header bgImg="bgImgSrc"></Header>

	<div id="main-content">

		<MainContent></MainContent>
	
	</div>

    <InfoBox></InfoBox>


</div>

