#!/bin/bash

echo "======================================"
echo "Supabase Connectivity Diagnostic Tool"
echo "======================================"
echo ""

# Extract Supabase URL from .env if it exists
if [ -f .env ]; then
    SUPABASE_URL=$(grep PUBLIC_SUPABASE_URL .env | cut -d '=' -f2 | tr -d ' "'"'"'')
    echo "Found Supabase URL in .env: $SUPABASE_URL"
    echo ""
fi

echo "1. Testing basic internet connectivity..."
if ping -c 2 8.8.8.8 > /dev/null 2>&1; then
    echo "   ✓ Internet connection is working"
else
    echo "   ✗ No internet connection"
    exit 1
fi

echo ""
echo "2. Testing DNS resolution..."
if nslookup google.com > /dev/null 2>&1; then
    echo "   ✓ DNS is working"
else
    echo "   ✗ DNS resolution failed"
fi

echo ""
echo "3. Testing Supabase main domain..."
if timeout 5 curl -I https://supabase.com > /dev/null 2>&1; then
    echo "   ✓ Can reach supabase.com"
else
    echo "   ✗ Cannot reach supabase.com (BLOCKED)"
fi

echo ""
echo "4. Testing Supabase API domain..."
if timeout 5 curl -I https://supabase.co > /dev/null 2>&1; then
    echo "   ✓ Can reach supabase.co"
else
    echo "   ✗ Cannot reach supabase.co (BLOCKED)"
fi

if [ ! -z "$SUPABASE_URL" ]; then
    echo ""
    echo "5. Testing your specific Supabase project..."
    if timeout 5 curl -I "$SUPABASE_URL" > /dev/null 2>&1; then
        echo "   ✓ Can reach your Supabase project"
    else
        echo "   ✗ Cannot reach your Supabase project (BLOCKED)"
    fi
fi

echo ""
echo "======================================"
echo "Diagnosis Complete"
echo "======================================"
echo ""
echo "If Supabase domains are blocked, try:"
echo "1. Disable firewall temporarily"
echo "2. Use a VPN"
echo "3. Switch to mobile hotspot"
echo "4. Check if your ISP/network blocks Supabase"
echo "5. Contact your network administrator"
