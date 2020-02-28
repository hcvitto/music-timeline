<script>
import InfoBox from "../components/InfoBox/InfoBox.svelte";

export let appTitle = "Music timeline";
export let bgImgSrc = "https://lh3.googleusercontent.com/DtTDVG5hB511J5fVWBA1WafPOYH53jA32yRDmeg3pqANODWMlB3M9JdSb-8vgPVjbTc97ICD3i9H9XU-PBgWZGsapLzGNtDps8hhxmLuFAOe9eRmXMMhAVp125W7593rJ30Cvbzb0PMIf3Qe2EVsjkX97_l9zUne9rVIWctKLqOZV_YwT6cMtJfKOTbK-kAUYJhwWg-GbSMhvxK9Myau7wJWsPuDde_b1HXtvMlVNai493GoUp3ysO1_RYKSLaLetc2VoVfSh_pJWZ8uZU7IdVpTq2bb3tepcgz8lq_t98wHrWSo3vqqrImZjfyeKB3Y2Jb_GRSN4cltWSgB1h_04iFYQbWEYX37mrtADNuFRdGpt5yFWmIuQdFkCCsRFwOA32m_j1AbFRbGr_dM1DRisUQE7HnhDcf3F7kr8j9ZWqrx921oqFumOSyrujAhJQkZwOnH6ujLQAreuMhQ5APcj_xbWr1vYzKpVSg06Fz7N7sK4VVDZpBnXfHonSWOZLIxQZaxL2tSl8TQXdUP5HPLASHILtznO8zIg1BldMaCsbkGPIDHI2lIwMQ8uC4nGE_5Vx_Hp7YCMJByPdgSzKjR5J9NadBpqeNuFINmzE4xsuvIxxm1rVDiBtd4tabkk7Lp_-P2twtq0HzL0qmdwS1uqa_TcsVh5ir0-8VUDZGWD1vnF9MtjlrFBA=s250-k-rw-no"
</script>

<style type="text/scss">
header {
    background: 
        linear-gradient(90deg, 
            #5461c8 12.5%, 
            #c724b1 0 25%, 
            #e4002b 0 37.5%, 
            #ff6900 0 50%, 
            #f6be00 0 62.5%, 
            #97d700 0 75%, 
            #00ab84 0 87.5%, 
            #00a3e0 0);
    align-items: center;
    display: flex;
    padding-left: 15px;
    position: relative;

    h1 {
        color: var(--main-text-color);
        color: #fff;
    }
}
</style>

<header>
    <InfoBox></InfoBox>
    <h1>{appTitle}</h1>
</header>
