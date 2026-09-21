console.log("Content Loaded");

function findComposeToolBar(){
    const selectors = [
        '.btC',
        '.aDh',
        '[role = "toolbar"]',
        'gU.Up'
    ];
    for(const selector of selectors){
        const toolbar = document.querySelector(selector);
        if(toolbar){
            return toolbar;
        }
        return null;
    }
}

function getEmailContent(){
    const selectors = [
        '.h7',
        '.a3s.aiL',
        '[role = "presentation"]',
        'gmail_quote'
    ];
    for(const selector of selectors){
        const content = document.querySelector(selector);
        if(content){
            return content.innerText.trim();
        }
        return '';
    }
}

function createAIButton(){
    const button = document.createElement('div');
    button.className = 'T-I J-J5-Ji aoO v7 T-I-atl L3';
    button.style.marginRight = '8px';
    button.innerHTML = 'AI reply';
    button.setAttribute('role', 'button');
    button.setAttribute('data-tooltip', 'Generate AI Reply');
    return button;
}

function injectButton() {
    const existingButton = document.querySelector('.ai-reply-button');
    if(existingButton){
        existingButton.remove();
    }

    const toolbar = findComposeToolBar();

    if(!toolbar){
        console.log("Toolbar not found");
        return;
    }
    console.log("Toolbar found, creating AI button");
    const button = createAIButton();
    button.classList.add('.ai-reply-button');
    button.addEventListener('click', async () => {
        try {
            button.innerHTML = 'Generating...';
            button.disabled = true;
            const emailContent = getEmailContent();
            const response = await fetch('http://localhost:8080/api/email/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    emailContent: emailContent,
                    tone: "professional"
                })
            });
            if(!response.ok){
                throw new Error("API request failed");
            }

            const generatedReply = await response.text();
            const composeBox = document.querySelector('div[contenteditable="true"][role="textbox"]');

            if(composeBox){
                composeBox.focus();
                document.execCommand('insertText', false, generatedReply);
            }else{
                console.error('Compose Box was not found');
                
            }
        } catch (error) {
            console.error(error);
            alert('Failed to generate reply');
        } finally{
            button.innerHTML = 'AI reply';
            button.disabled = false;
        }    
    });

    toolbar.insertBefore(button, toolbar.firstChild);
    
}

const observer = new MutationObserver((mutations) => {
    for(const mutation of mutations){
        const addedNodes = Array.from(mutation.addedNodes);
        const hasComposedElements = addedNodes.some(node => 
            node.nodeType === node.ELEMENT_NODE &&
            (node.matches('.aDh, .btC, [role = "dialog"]') || node.querySelector('.aDh, .btC, [role = "dialog"]'))
        );

        if(hasComposedElements){
            console.log("Compose window detected");
            setTimeout(injectButton, 500);
            
        }
    }

})

observer.observe(document.body, {
    childList : true,
    subtree : true
})