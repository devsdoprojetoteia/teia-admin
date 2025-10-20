export const useBreakpoints = () => {
    const isMobile = ref(false)
    const isTablet = ref(false)
    const isDesktop = ref(false)

    const updateBreakpoints = () => {
        if (process.client) {
            const width = window.innerWidth
            isMobile.value = width < 768
            isTablet.value = width >= 768 && width < 1024
            isDesktop.value = width >= 1024
        }
    }

    if (process.client) {
        updateBreakpoints()
        window.addEventListener('resize', updateBreakpoints)

        onUnmounted(() => {
            window.removeEventListener('resize', updateBreakpoints)
        })
    }

    return {
        isMobile,
        isTablet,
        isDesktop
    }
}