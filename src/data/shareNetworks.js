// Social networks offered in the share window. buildUrl returns the network's official share link
// (no API keys needed). copyFirst: the network can't receive our text, so it is copied to the clipboard to paste it.
// icon is a Remix Icon class (loaded from the CDN in index.html).
const encode = encodeURIComponent

export const SHARE_NETWORKS = [
    {
        id: 'facebook',
        name: 'Facebook',
        icon: 'ri-facebook-circle-fill',
        color: 'text-[#1877F2]',
        copyFirst: true,
        buildUrl: (url) => `https://www.facebook.com/sharer/sharer.php?u=${encode(url)}`,
    },
    {
        id: 'x',
        name: 'X (Twitter)',
        icon: 'ri-twitter-x-fill',
        color: 'text-black',
        buildUrl: (url, message) => `https://twitter.com/intent/tweet?text=${encode(message)}&url=${encode(url)}`,
    },
    {
        id: 'instagram',
        name: 'Instagram',
        icon: 'ri-instagram-line',
        color: 'text-[#E4405F]',
        copyFirst: true,
        buildUrl: () => 'https://www.instagram.com/',
    },
    {
        id: 'whatsapp',
        name: 'WhatsApp',
        icon: 'ri-whatsapp-line',
        color: 'text-[#25D366]',
        buildUrl: (url, message) => `https://wa.me/?text=${encode(`${message} ${url}`)}`,
    },
    {
        id: 'linkedin',
        name: 'LinkedIn',
        icon: 'ri-linkedin-box-fill',
        color: 'text-[#0A66C2]',
        copyFirst: true,
        buildUrl: (url) => `https://www.linkedin.com/sharing/share-offsite/?url=${encode(url)}`,
    },
]
