module.exports = {
    theme: {
        extend: {
            clipPath: {
                'inset-corner': 'inset(0%, 0%, 100px, 100px)'
            }
        }
    },
    plugins: [
        require('tailwindcss-clip-path')
    ]
}