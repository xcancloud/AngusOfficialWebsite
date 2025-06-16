#!/usr/bin/env node
import fs from 'fs'
import path from 'path'

// Get Environment Name from Command Line Arguments or Environment Variables
const envName = process.env.ENV_NAME || process.argv[2] || 'dev'

// Configure Path
const rootDir = process.cwd()
const sourceDir = path.join(rootDir, 'conf')
const vpDistDir = path.join(rootDir, 'dist')
const finalTargetDir = path.join(vpDistDir, 'meta')

// Main Execution Function
function copyConfigFiles() {
    try {
        // Ensure Environment Name is Valid
        if (!envName.match(/^[a-zA-Z0-9_-]+$/)) {
            throw new Error(`Invalid Environment Name: ${envName}`)
        }

        // Check if Source Directory Exists
        if (!fs.existsSync(sourceDir)) {
            console.warn(`⚠️  Source Directory Does Not Exist: ${sourceDir}`)
            return
        }

        // Check if VitePress Dist Directory Exists
        if (!fs.existsSync(vpDistDir)) {
            throw new Error(`VitePress Build Directory Does Not Exist, Please Run the Build Command First: ${vpDistDir}`)
        }

        // Create Target Directory (Recursive Creation)
        ensureDirExists(finalTargetDir)

        // Get Files to Copy
        const baseConfigFiles = ['env', '.env']
        const envConfigFiles = [`env.${envName}`, `.env.${envName}`]

        // Process base config files with variable replacement
        baseConfigFiles.forEach(fileName => {
            const sourcePath = path.join(sourceDir, fileName)
            const targetPath = path.join(finalTargetDir, fileName)

            if (fileExists(sourcePath)) {
                let content = fs.readFileSync(sourcePath, 'utf-8')
                content = replaceProfileVariable(content, envName)
                fs.writeFileSync(targetPath, content, 'utf-8')
                console.log(`✓ Processed: ${fileName}`)
            } else {
                console.log(`➖ Not found: ${fileName} (skipped)`)
            }
        })

        // Copy environment-specific config files
        envConfigFiles.forEach(fileName => {
            const sourcePath = path.join(sourceDir, fileName)
            const targetPath = path.join(finalTargetDir, fileName)

            if (fileExists(sourcePath)) {
                fs.copyFileSync(sourcePath, targetPath)
                console.log(`✓ Copied: ${fileName}`)
            } else {
                console.log(`➖ Not found: ${fileName} (skipped)`)
            }
        })

        // Copy all .conf files
        copyAllWithExtension(sourceDir, finalTargetDir, '.conf')

        console.log(`✓ Configuration files processed successfully to: ${path.relative(rootDir, finalTargetDir)}`)
        console.log(`   Environment: ${envName}`)

    } catch (error) {
        console.error(`x Configuration processing failed: ${error.message}`)
        process.exit(1)
    }
}

// Ensure Directory Exists (sync version)
function ensureDirExists(dirPath) {
    try {
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true })
        }
    } catch (err) {
        throw new Error(`Failed to create directory ${dirPath}: ${err.message}`)
    }
}

// Check if file exists (sync version)
function fileExists(filePath) {
    try {
        return fs.existsSync(filePath) && fs.statSync(filePath).isFile()
    } catch (err) {
        return false
    }
}

// Replace all occurrences of ${PROFILE} variable with envName
function replaceProfileVariable(content, envName) {
    // Support all possible formats
    const replacements = [
        { pattern: /\${PROFILE}/g, replace: envName },
        { pattern: /\${ENV_NAME}/g, replace: envName },
        { pattern: /\${DEPLOY_ENV}/g, replace: envName },
        { pattern: /\$PROFILE/g, replace: envName },
        { pattern: /{PROFILE}/g, replace: envName }
    ]

    return replacements.reduce(
        (result, repl) => result.replace(repl.pattern, repl.replace),
        content
    )
}

// Copy files with specific extension (sync version)
function copyAllWithExtension(sourceDir, targetDir, extension) {
    try {
        if (!fs.existsSync(sourceDir)) return

        const files = fs.readdirSync(sourceDir)
        const confFiles = files.filter(file => file.endsWith(extension))

        let count = 0
        confFiles.forEach(file => {
            const source = path.join(sourceDir, file)
            const target = path.join(targetDir, file)

            if (fs.existsSync(source)) {
                fs.copyFileSync(source, target)
                console.log(`✓ Copied: ${file}`)
                count++
            }
        })

        if (count > 0) {
            console.log(`   Copied ${count} .conf files`)
        }
    } catch (err) {
        console.error(`⚠️ Failed to copy .conf files: ${err.message}`)
    }
}

// Execute the script
copyConfigFiles()